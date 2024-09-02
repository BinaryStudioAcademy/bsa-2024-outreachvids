import {
    type DragEndEvent,
    type ItemDefinition,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { TimelineView } from './timeline-view/timeline-view.js';

type Properties = {
    initialRange: Range;
    initialItems: ItemDefinition[];
};

const Timeline: React.FC<Properties> = ({
    initialRange,
    initialItems,
}): JSX.Element => {
    const [range, setRange] = useState(initialRange);
    const [items, setItems] = useState(initialItems);

    const onResizeEnd = useCallback((event: ResizeEndEvent) => {
        const updatedSpan =
            event.active.data.current.getSpanFromResizeEvent?.(event);

        if (!updatedSpan) {
            return;
        }

        const activeItemId = event.active.id;

        setItems((previous) =>
            previous.map((item) => {
                return item.id === activeItemId
                    ? { ...item, span: updatedSpan }
                    : item;
            }),
        );
    }, []);

    const onDragEnd = useCallback((event: DragEndEvent) => {
        if (
            event.active.data.current['type'] !==
            event.over?.data.current?.['type']
        ) {
            return;
        }

        const activeRowId = event.over?.id as string;
        const updatedSpan =
            event.active.data.current.getSpanFromDragEvent?.(event);

        if (!updatedSpan || !activeRowId) {
            return;
        }

        const activeItemId = event.active.id;

        setItems((previous) =>
            previous.map((item) => {
                if (item.id !== activeItemId) {
                    return item;
                }

                return {
                    ...item,
                    rowId: activeRowId,
                    span: updatedSpan,
                };
            }),
        );
    }, []);

    return (
        <TimelineContext
            range={range}
            onDragEnd={onDragEnd}
            onResizeEnd={onResizeEnd}
            onRangeChanged={setRange}
        >
            <TimelineView items={items} />
        </TimelineContext>
    );
};

export { Timeline };
