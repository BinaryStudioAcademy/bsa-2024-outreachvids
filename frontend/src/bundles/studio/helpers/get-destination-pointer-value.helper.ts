import { type TimelineItemWithSpan } from '../types/timeline-item.type.js';

type getDestinationPointerValueParameters = {
    newActiveItemIndex: number;
    previousActiveItemIndex: number;
    items: Array<TimelineItemWithSpan>;
};

const getDestinationPointerValue = ({
    newActiveItemIndex,
    previousActiveItemIndex,
    items,
}: getDestinationPointerValueParameters): number => {
    switch (newActiveItemIndex) {
        case previousActiveItemIndex + 1: {
            return items[previousActiveItemIndex]?.span.start as number;
        }
        case items.length: {
            return previousActiveItemIndex === items.length - 1
                ? (items.at(-2)?.span.end as number)
                : (items.at(-1)?.span.end as number);
        }
        default: {
            return items[newActiveItemIndex]?.span.start as number;
        }
    }
};

export { getDestinationPointerValue };
