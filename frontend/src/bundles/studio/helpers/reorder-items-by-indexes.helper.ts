import { type TimelineItemWithSpan } from '../types/types.js';

type ReorderItemsByIndexesParameters = {
    oldIndex: number;
    newIndex: number;
    items: Array<TimelineItemWithSpan>;
};

const reorderItemsByIndexes = ({
    oldIndex,
    newIndex,
    items,
}: ReorderItemsByIndexesParameters): Array<TimelineItemWithSpan> => {
    const itemsCopy = [...items];

    const [removed] = itemsCopy.splice(oldIndex, 1);
    itemsCopy.splice(newIndex, 0, removed as TimelineItemWithSpan);

    return itemsCopy;
};

export { reorderItemsByIndexes };
