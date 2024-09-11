import { Box } from '~/bundles/common/components/components.js';
import {
    useAnimationFrame,
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef as useReference,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

const TimeCursor: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isPlaying, elapsedTime } = useAppSelector(({ studio }) => ({
        isPlaying: studio.player.isPlaying,
        elapsedTime: studio.player.elapsedTime,
    }));
    const totalDuration = useAppSelector(selectTotalDuration);

    const timeCursorReference = useReference<HTMLDivElement>(null);
    const renderTimeReference = useReference(0);
    const { direction, sidebarWidth, valueToPixels, pixelsToValue } =
        useTimelineContext();

    const side = direction === 'rtl' ? 'right' : 'left';

    const [isDragging, setIsDragging] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    useEffect(() => {
        if (!timeCursorReference.current || isPlaying) {
            return;
        }

        // Move time cursor when elapsed time is changed and video is not playing

        const timeElapsedInPixels = valueToPixels(elapsedTime);
        const sideDelta = sidebarWidth + timeElapsedInPixels;

        timeCursorReference.current.style[side] = `${sideDelta}px`;
    }, [
        elapsedTime,
        isPlaying,
        side,
        sidebarWidth,
        timeCursorReference,
        valueToPixels,
    ]);

    useEffect(() => {
        if (elapsedTime >= totalDuration) {
            void dispatch(studioActions.setPlaying(false));
        }
    }, [dispatch, elapsedTime, totalDuration]);

    const offsetCursor = (): void => {
        if (!timeCursorReference.current || cursorPosition) {
            return;
        }

        const currentTime = Date.now();
        const timeDelta =
            currentTime - renderTimeReference.current + elapsedTime;
        const timeDeltaInPixels = valueToPixels(timeDelta);

        const sideDelta = sidebarWidth + timeDeltaInPixels;
        timeCursorReference.current.style[side] = `${sideDelta}px`;

        dispatch(studioActions.setElapsedTime(timeDelta));
        renderTimeReference.current = currentTime;
    };

    useAnimationFrame(offsetCursor, isPlaying);

    useEffect(() => {
        if (isPlaying) {
            renderTimeReference.current = Date.now();
        }
    }, [cursorPosition, renderTimeReference, isPlaying]);

    useLayoutEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            if (!isDragging || !timeCursorReference.current) {
                return;
            }

            const newCursorPosition = event.clientX - sidebarWidth;

            const newCursorPositionInTime = pixelsToValue(newCursorPosition);

            if (newCursorPositionInTime > totalDuration) {
                setCursorPosition(valueToPixels(totalDuration));
                return;
            }

            dispatch(studioActions.setElapsedTime(newCursorPositionInTime));

            setCursorPosition(newCursorPosition);
        };

        const handleMouseUp = (event: MouseEvent): void => {
            setIsDragging(false);
            const newCursorPosition = event.clientX - sidebarWidth;
            const newCursorPositionInTime = pixelsToValue(newCursorPosition);

            if (newCursorPositionInTime > totalDuration) {
                setCursorPosition(null);
                return;
            }

            renderTimeReference.current = Date.now() - newCursorPositionInTime;

            dispatch(studioActions.setElapsedTime(newCursorPositionInTime));
            setCursorPosition(null);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        isDragging,
        sidebarWidth,
        side,
        pixelsToValue,
        renderTimeReference,
        timeCursorReference,
        dispatch,
        totalDuration,
        valueToPixels,
    ]);

    useLayoutEffect(() => {
        if (cursorPosition && timeCursorReference.current) {
            timeCursorReference.current.style[side] =
                `${cursorPosition + sidebarWidth}px`;
        }
    }, [cursorPosition, side, sidebarWidth, timeCursorReference]);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    return (
        <Box
            ref={timeCursorReference}
            className={styles['timeCursor']}
            role="button"
            tabIndex={0}
            backgroundColor="brand.secondary.300"
            onMouseDown={handleMouseDown}
        >
            <Box
                className={styles['timeCursorSquare']}
                backgroundColor="brand.secondary.300"
            />
            <Box
                className={styles['timeCursorTriangle']}
                color="brand.secondary.300"
            />
        </Box>
    );
};

export { TimeCursor };
