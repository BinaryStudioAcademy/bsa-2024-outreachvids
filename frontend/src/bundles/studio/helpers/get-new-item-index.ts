import { type Span } from 'dnd-timeline';

import { type TimelineItemWithSpan } from '../types/types.js';

const getNewItemIndexBySpan = <T extends TimelineItemWithSpan>(
    { start }: Span,
    items: Array<T>,
): number => {
    if (start < 0) {
        return 0;
    }

    let newActiveItemIndex = -1;

    for (const [index, item] of items.entries()) {
        const { span, duration } = item;

        if (start > span.start && start < span.end) {
            const center = span.start + duration / 2;

            return (newActiveItemIndex = center > start ? index : index + 1);
        }
    }

    if (newActiveItemIndex === -1) {
        newActiveItemIndex = items.length;
    }

    return newActiveItemIndex;
};

export { getNewItemIndexBySpan };
