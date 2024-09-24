import {
    type TimelineItem,
    type TimelineItemWithSpan,
} from '../types/types.js';

const setItemsSpan = <T extends TimelineItem>(
    items: Array<T>,
): Array<T & TimelineItemWithSpan> => {
    let start = 0;

    return items.map((item) => {
        const duration = item.duration;

        const updatedItem = {
            ...item,
            span: { start, end: start + duration },
        };

        start += duration;

        return updatedItem;
    });
};

export { setItemsSpan };
