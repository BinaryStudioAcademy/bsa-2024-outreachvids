import { type PlayerRef } from '@remotion/player';
import { type RefObject } from 'react';

import { Box } from '~/bundles/common/components/components.js';
import { FPS } from '~/bundles/common/components/upload-video/components/video-player/libs/constants/fps.constant.js';
import {
    useCallback,
    useLayoutEffect,
    useRef as useReference,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import styles from './styles.module.css';

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

type Properties = {
    interval?: number;
};

const TimeCursor: React.FC<Properties> = ({ interval }) => {
    const timeCursorReference = useReference<HTMLDivElement>(null);
    const renderTimeReference = useReference(Date.now());
    const { range, direction, sidebarWidth, valueToPixels, pixelsToValue } =
        useTimelineContext();

    const side = direction === 'rtl' ? 'right' : 'left';
    const millisecondPerRefresh = 1000;
    const [isDragging, setIsDragging] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    useLayoutEffect(() => {
        const offsetCursor = (): void => {
            if (!timeCursorReference.current || cursorPosition !== null) {
                return;
            }
            const timeDelta = Date.now() - renderTimeReference.current;
            const timeDeltaInPixels = valueToPixels(timeDelta);

            const sideDelta = sidebarWidth + timeDeltaInPixels;
            timeCursorReference.current.style[side] = `${sideDelta}px`;
        };
        offsetCursor();
        const cursorUpdateInterval = setInterval(
            offsetCursor,
            interval ?? millisecondPerRefresh,
        );
        return () => {
            clearInterval(cursorUpdateInterval);
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
    ]);

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

            playerRef.current?.seekTo((newCursorPositionInTime / 1000) * FPS);
            if (isPlaying) {
                playerRef.current?.pause();
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
