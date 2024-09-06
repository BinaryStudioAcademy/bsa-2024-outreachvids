import { Box } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useLayoutEffect,
    useRef as useReference,
    useState,
    useTimelineContext,
} from '~/bundles/common/hooks/hooks.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

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
            setCursorPosition(newCursorPosition);
        };

        const handleMouseUp = (event: MouseEvent): void => {
            setIsDragging(false);
            const newCursorPosition = event.clientX - sidebarWidth;
            renderTimeReference.current =
                Date.now() - pixelsToValue(newCursorPosition);
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
