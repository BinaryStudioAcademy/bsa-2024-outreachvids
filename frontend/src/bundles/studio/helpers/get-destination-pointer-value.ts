import { type TimelineItemWithSpan } from '../types/types.js';

type getDestinationPointerValueParameters = {
    oldIndex: number;
    newIndex: number;
    items: Array<TimelineItemWithSpan>;
};

const getDestinationPointerValue = ({
    oldIndex,
    newIndex,
    items,
}: getDestinationPointerValueParameters): number => {
    switch (newIndex) {
        case oldIndex + 1: {
            return items[oldIndex]?.span.start as number;
        }
        case items.length: {
            return oldIndex === items.length - 1
                ? (items.at(-2)?.span.end as number)
                : (items.at(-1)?.span.end as number);
        }
        default: {
            return items[newIndex]?.span.start as number;
        }
    }
};

export { getDestinationPointerValue };
