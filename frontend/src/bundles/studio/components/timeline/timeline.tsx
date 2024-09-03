import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.helper.js';
import {
    type DestinationPointer,
    type RowType,
    type TimelineRows,
} from '~/bundles/studio/types/types.js';

import { getDestinationPointerValue } from '../../helpers/get-destination-pointer-value.helper.js';
import { getNewItemIndexBySpan } from '../../helpers/get-new-item-index-by-span.helper.js';
import { reorderItemsByIndexes } from '../../helpers/reorder-items-by-indexes.helper.js';
import { TimelineView } from './timeline-view/timeline-view.js';

type Properties = {
    initialRange: Range;
    initialItems: TimelineRows;
};

const Timeline: React.FC<Properties> = ({ initialRange, initialItems }) => {
    const [range, setRange] = useState(initialRange);
    const [items, setItems] = useState(setItemsSpan(initialItems));
    const [destinationPointer, setDestinationPointer] =
        useState<DestinationPointer | null>(null);

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

    const onDragMove = useCallback(
        (event: DragMoveEvent) => {
            const activeItem = event.active.data.current;
            const activeItemId = event.active.id as string;
            const activeItemType = activeItem['type'] as RowType;

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const activeRowItems = items[activeItemType];

            const previousActiveItemIndex = activeRowItems.findIndex(
                (item) => item.id === activeItemId,
            );

            if (previousActiveItemIndex === -1) {
                return;
            }

            const newActiveItemIndex = getNewItemIndexBySpan(
                { id: activeItemId, span: updatedSpan },
                activeRowItems,
            );

            setDestinationPointer({
                type: activeItemType,
                value: getDestinationPointerValue({
                    newActiveItemIndex,
                    previousActiveItemIndex,
                    items: activeRowItems,
                }),
            });
        },
        [items],
    );

    const onDragEnd = useCallback((event: DragEndEvent) => {
        setDestinationPointer(null);

        const activeItem = event.active.data.current;
        const activeItemId = event.active.id as string;
        const activeItemType = activeItem['type'] as RowType;

        const activeRowId = event.over?.id as string;
        const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

        if (!updatedSpan || !activeRowId) {
            return;
        }

        setItems((previousItems) => {
            const activeRowItems = previousItems[activeItemType];

            const previousActiveItemIndex = activeRowItems.findIndex(
                (item) => item.id === activeItemId,
            );

            if (previousActiveItemIndex === -1) {
                return previousItems;
            }

            const newActiveItemIndex = getNewItemIndexBySpan(
                { id: activeItemId, span: updatedSpan },
                activeRowItems,
            );

            return setItemsSpan({
                ...previousItems,
                [activeItemType]: reorderItemsByIndexes({
                    oldIndex: previousActiveItemIndex,
                    newIndex: newActiveItemIndex,
                    items: activeRowItems,
                }),
            });
        });
    }, []);

    return (
        <TimelineContext
            range={range}
            onDragEnd={onDragEnd}
            onResizeEnd={onResizeEnd}
            onRangeChanged={setRange}
            onDragMove={onDragMove}
        >
            <TimelineView
                items={items}
                destinationPointer={destinationPointer}
            />
        </TimelineContext>
    );
};

export { Timeline };
