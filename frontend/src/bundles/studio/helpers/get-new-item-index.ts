import { type Span } from 'dnd-timeline';

import { type TimelineItemWithSpan } from '../types/types.js';

const getNewItemIndexBySpan = (
    { start }: Span,
    items: Array<TimelineItemWithSpan>,
): number => {
    if (start < 0) {
        return 0;
    }

    let newActiveItemIndex = -1;

    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < items.length; index++) {
        const { span, duration } = items[index] as TimelineItemWithSpan;

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
