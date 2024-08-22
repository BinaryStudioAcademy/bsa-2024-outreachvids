import { useTimelineContext } from 'dnd-timeline';
import { useLayoutEffect,useRef } from 'react';

interface TimeCursorProperties {
	interval?: number;
}

const TimeCursor = (properties: TimeCursorProperties): JSX.Element | null => {
    const timeCursorReference = useRef<HTMLDivElement>(null);

    const { range, direction, sidebarWidth, valueToPixels } =
        useTimelineContext();

    const side = direction === 'rtl' ? 'right' : 'left';

    const isVisible =
        Date.now() > range.start && Date.now() < range.end;

    useLayoutEffect(() => {
        if (!isVisible) {
            return;
        }

        const offsetCursor = (): void => {
            if (!timeCursorReference.current) {
                return;
            }
            const timeDelta = Date.now() - range.start;
            const timeDeltaInPixels = valueToPixels(timeDelta);

            const sideDelta = sidebarWidth + timeDeltaInPixels;
            timeCursorReference.current.style[side] = `${sideDelta}px`;
        };

        offsetCursor();

        const interval = setInterval(offsetCursor, properties.interval || 1000);

        return () => {
            clearInterval(interval);
        };
    }, [
        side,
        sidebarWidth,
        properties.interval,
        range.start,
        valueToPixels,
        isVisible,
    ]);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            ref={timeCursorReference}
            style={{
                height: '100%',
                width: '1px',
                zIndex: 3,
                backgroundColor: 'red',
                position: 'absolute',
            }}
        />
    );
};

export { TimeCursor };