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
    const item = itemsCopy[oldIndex] as TimelineItemWithSpan;

    if (newIndex === oldIndex) {
        return items;
    }

    if (newIndex > oldIndex) {
        return itemsCopy.toSpliced(newIndex, 0, item).toSpliced(oldIndex, 1);
    }

    return itemsCopy.toSpliced(oldIndex, 1).toSpliced(newIndex, 0, item);
};

export { reorderItemsByIndexes };
