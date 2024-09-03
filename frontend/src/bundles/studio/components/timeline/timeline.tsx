import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';
import {
    type DestinationPointer,
    type RowType,
    type TimelineItemWithSpan,
    type TimelineRows,
} from '~/bundles/studio/types/types.js';

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
            const activeItemType = activeItem['type'] as RowType;

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const spanStart = updatedSpan.start;
            const activeRow = items[activeItemType];

            let newActiveItemIndex = -1;

            // eslint-disable-next-line unicorn/no-array-for-each
            activeRow.forEach(({ span, duration }, index) => {
                if (spanStart > span.start && spanStart < span.end) {
                    const center = span.start + duration / 2;

                    newActiveItemIndex = center > spanStart ? index - 1 : index;
                }
            });

            setDestinationPointer({
                type: activeItemType,
                value:
                    newActiveItemIndex === -1
                        ? (activeRow.at(-1)?.span.end as number)
                        : (activeRow[newActiveItemIndex]?.span.end as number),
            });
        },
        [items],
    );

    const onDragEnd = useCallback((event: DragEndEvent) => {
        setDestinationPointer(null);
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

            const previousActiveItemIndex = activeRow.findIndex(
                ({ id }) => id === activeItemId,
            );

            if (previousActiveItemIndex === -1) {
                return previousItems;
            }

            let newActiveItemIndex = -1;

            // eslint-disable-next-line unicorn/no-array-for-each
            activeRow.forEach(({ span, duration }, index) => {
                if (spanStart > span.start && spanStart < span.end) {
                    const center = span.start + duration / 2;

                    newActiveItemIndex = center > spanStart ? index : index + 1;
                }
            });

            if (newActiveItemIndex === -1) {
                const orderedItems = [
                    ...activeRow.toSpliced(previousActiveItemIndex, 1),
                    activeRow[previousActiveItemIndex] as TimelineItemWithSpan,
                ];

                return setItemsSpan({
                    ...previousItems,
                    [activeItemType]: orderedItems,
                });
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
