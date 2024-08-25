import { useTimelineContext } from 'dnd-timeline';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface TimeCursorProperties {
    interval?: number; 
}

const TimeCursor = (properties: TimeCursorProperties): JSX.Element | null => {
    const timeCursorReference = useRef<HTMLDivElement>(null); 
    const renderTimeReference = useRef(Date.now());
    const { range, direction, sidebarWidth, valueToPixels, pixelsToValue } = useTimelineContext(); 

    const side = direction === 'rtl' ? 'right' : 'left'; 

    const isVisible = true;
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
        cursorPosition,
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
            renderTimeReference.current = Date.now() - pixelsToValue(newCursorPosition);
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
    }, [isDragging, sidebarWidth, side, pixelsToValue]);

    useLayoutEffect(() => {
        if (cursorPosition !== null && timeCursorReference.current) {
            timeCursorReference.current.style[side] = `${cursorPosition + sidebarWidth}px`; 
        }
    }, [cursorPosition, side, sidebarWidth]);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true); 
        },[]);

    return (
        <div
            ref={timeCursorReference} 
            style={{
                height: '100%', 
                width: '5px', 
                zIndex: 3, 
                backgroundColor: 'red',
                position: 'absolute',
                cursor: 'pointer',
            }}
            role="button"
            tabIndex={0}
            onMouseDown={handleMouseDown}

        >
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '5px solid red',
                    position: 'absolute',
                    top: '-5px',
                    left: '-2.5px',
                }}
            />
        </div>
    );
};

export { TimeCursor };