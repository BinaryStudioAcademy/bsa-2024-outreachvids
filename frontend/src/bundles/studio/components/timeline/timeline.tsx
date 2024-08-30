import {
    type DragEndEvent,
    type ItemDefinition,
    type Range,
    type ResizeEndEvent,
    type RowDefinition,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { TimelineView } from './timeline-view/timeline-view.js';

type Properties = {
    initialRange: Range;
    initialRows: RowDefinition[];
    initialItems: ItemDefinition[];
};

const Timeline: React.FC<Properties> = ({
    initialRange,
    initialRows,
    initialItems,
}): JSX.Element => {
    const [range, setRange] = useState(initialRange);
    const [items, setItems] = useState(initialItems);
    const rows = initialRows;
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
            <TimelineView items={items} rows={rows} />
        </TimelineContext>
    );
};

export { Timeline };
