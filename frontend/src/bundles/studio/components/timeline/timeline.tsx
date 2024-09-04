import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/row-names.enum.js';
import {
    getDestinationPointerValue,
    getNewItemIndexBySpan,
    reorderItemsByIndexes,
    setItemsSpan,
} from '~/bundles/studio/helpers/helpers.js';
import {
    type DestinationPointer,
    type RowType,
    type TimelineRows,
} from '~/bundles/studio/types/types.js';

import { TimelineView } from './components.js';

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

        if (activeItemType === RowNames.SCRIPT) {
            return;
        }

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

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const activeItemType = activeItem['type'] as RowType;
            const activeRowItems = items[activeItemType];

            const previousActiveItemIndex = activeRowItems.findIndex(
                (item) => item.id === event.active.id,
            );

            const newActiveItemIndex = getNewItemIndexBySpan(
                updatedSpan,
                activeRowItems,
            );

            setDestinationPointer({
                type: activeItemType,
                value: getDestinationPointerValue({
                    oldIndex: previousActiveItemIndex,
                    newIndex: newActiveItemIndex,
                    items: activeRowItems,
                }),
            });
        },
        [items],
    );

    const onDragEnd = useCallback((event: DragEndEvent) => {
        setDestinationPointer(null);

        const activeItem = event.active.data.current;

        const activeRowId = event.over?.id as string;
        const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

        if (!updatedSpan || !activeRowId) {
            return;
        }

        setItems((previousItems) => {
            const activeItemType = activeItem['type'] as RowType;
            const activeRowItems = previousItems[activeItemType];

            const previousActiveItemIndex = activeRowItems.findIndex(
                (item) => item.id === event.active.id,
            );

            const newActiveItemIndex = getNewItemIndexBySpan(
                updatedSpan,
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
