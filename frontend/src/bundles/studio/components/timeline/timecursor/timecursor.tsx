import { Box } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef as useReference,
    useState,
    useTimelineContext,
} from '~/bundles/common/hooks/hooks.js';
import { MILLISECONDS_PER_REFRESH } from '~/bundles/studio/constants/constants.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    interval?: number;
};

const TimeCursor: React.FC<Properties> = ({ interval }) => {
    const dispatch = useAppDispatch();
    const { isPlaying, elapsedTime, duration } = useAppSelector(
        ({ studio }) => ({
            isPlaying: studio.player.isPlaying,
            elapsedTime: studio.player.elapsedTime,
            duration: studio.player.duration,
        }),
    );

    const timeCursorReference = useReference<HTMLDivElement>(null);
    const renderTimeReference = useReference(0);
    const { range, direction, sidebarWidth, valueToPixels, pixelsToValue } =
        useTimelineContext();

    const side = direction === 'rtl' ? 'right' : 'left';

    const [isDragging, setIsDragging] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    useEffect(() => {
        if (elapsedTime >= duration) {
            void dispatch(studioActions.setPlaying(false));
        }
    }, [dispatch, elapsedTime, duration]);

    useLayoutEffect(() => {
        const offsetCursor = (): void => {
            if (!timeCursorReference.current || cursorPosition !== null) {
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

        let cursorUpdateInterval: NodeJS.Timeout | null = null;

        if (isPlaying) {
            renderTimeReference.current = Date.now();

            offsetCursor();

            cursorUpdateInterval = setInterval(
                offsetCursor,
                interval ?? MILLISECONDS_PER_REFRESH,
            );
        }

        return () => {
            if (cursorUpdateInterval) {
                clearInterval(cursorUpdateInterval);
            }
        };
    }, [
        side,
        sidebarWidth,
        interval,
        range.start,
        valueToPixels,
        cursorPosition,
        renderTimeReference,
        timeCursorReference,
        isPlaying,
        elapsedTime,
        dispatch,
    ]);

    useLayoutEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            if (!isDragging || !timeCursorReference.current) {
                return;
            }

            const newCursorPosition = event.clientX - sidebarWidth;

            const newCursorPositionInTime = pixelsToValue(newCursorPosition);
            dispatch(studioActions.setElapsedTime(newCursorPositionInTime));

            setCursorPosition(newCursorPosition);
        };

        const handleMouseUp = (event: MouseEvent): void => {
            setIsDragging(false);
            const newCursorPosition = event.clientX - sidebarWidth;
            const newCursorPositionInTime = pixelsToValue(newCursorPosition);
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
    ]);

    useLayoutEffect(() => {
        if (cursorPosition !== null && timeCursorReference.current) {
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
            onMouseDown={handleMouseDown}
        >
            <Box className={styles['timeCursorArrow']} />
        </Box>
    );
};

export { TimeCursor };
