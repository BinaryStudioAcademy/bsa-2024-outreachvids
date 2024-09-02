import {
    type DragEndEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';
import {
    type RowType,
    type TimelineItemWithSpan,
    type TimelineRows,
} from '~/bundles/studio/types/types.js';

import { TimelineView } from './timeline-view/timeline-view.js';

type Properties = {
    initialRange: Range;
    initialItems: TimelineRows;
};

const Timeline: React.FC<Properties> = ({
    initialRange,
    initialItems,
}): JSX.Element => {
    const [range, setRange] = useState(initialRange);
    const [items, setItems] = useState(setItemsSpan(initialItems));

    const onResizeEnd = useCallback((event: ResizeEndEvent) => {
        const activeItem = event.active.data.current;
        const updatedSpan = activeItem.getSpanFromResizeEvent?.(event);

        if (!updatedSpan) {
            return;
        }

        const activeItemId = event.active.id;
        const activeItemType = activeItem['type'] as RowType;

        setItems((previous) =>
            setItemsSpan({
                ...previous,
                [activeItemType]: previous[activeItemType].map((item) =>
                    item.id === activeItemId
                        ? {
                              ...item,
                              duration: updatedSpan.end - updatedSpan.start,
                          }
                        : item,
                ),
            }),
        );
    }, []);

    const onDragEnd = useCallback((event: DragEndEvent) => {
        const activeItem = event.active.data.current;
        const activeItemType = activeItem['type'] as RowType;

        if (activeItemType !== event.over?.data.current?.['type']) {
            return;
        }

        const activeRowId = event.over?.id as string;
        const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

        if (!updatedSpan || !activeRowId) {
            return;
        }

        const activeItemId = event.active.id;

        const spanStart = updatedSpan.start;

        setItems((previousItems) => {
            const activeRow = previousItems[activeItemType];

            const newActiveItemIndex = activeRow.findIndex(
                ({ span }) => spanStart > span.start && spanStart < span.end,
            );

            if (newActiveItemIndex === -1) {
                return previousItems;
            }

            const previousActiveItemIndex = activeRow.findIndex(
                ({ id }) => id === activeItemId,
            );

            if (previousActiveItemIndex === -1) {
                return previousItems;
            }

            const orderedItems = activeRow
                .toSpliced(previousActiveItemIndex, 1)
                .toSpliced(
                    newActiveItemIndex,
                    0,
                    activeRow[previousActiveItemIndex] as TimelineItemWithSpan,
                );

            return setItemsSpan({
                ...previousItems,
                [activeItemType]: orderedItems,
            });
        });
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
