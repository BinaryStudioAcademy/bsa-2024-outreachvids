import { type PlayerRef } from '@remotion/player';
import { type RefObject } from 'react';

import { Box } from '~/bundles/common/components/components.js';
import { FPS } from '~/bundles/common/components/upload-video/components/video-player/libs/constants/fps.constant.js';
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

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const TimeCursor: React.FC<Properties> = ({ playerRef }) => {
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
        if (elapsedTime >= totalDuration) {
            void dispatch(studioActions.setPlaying(false));
        }
    }, [dispatch, elapsedTime, totalDuration]);

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
            dispatch(studioActions.setElapsedTime(newCursorPositionInTime)); //ms

            playerRef.current?.seekTo((newCursorPositionInTime / 1000) * FPS);
            if (isPlaying) {
                playerRef.current?.pause();
            }

            setCursorPosition(newCursorPosition);
        };

        const handleMouseUp = (event: MouseEvent): void => {
            setIsDragging(false);
            const newCursorPosition = event.clientX - sidebarWidth;
            const newCursorPositionInTime = pixelsToValue(newCursorPosition);
            renderTimeReference.current = Date.now() - newCursorPositionInTime;

            playerRef.current?.seekTo((newCursorPositionInTime / 1000) * 30);
            isPlaying ? playerRef.current?.play() : playerRef.current?.pause();

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
        isPlaying,
        playerRef,
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
