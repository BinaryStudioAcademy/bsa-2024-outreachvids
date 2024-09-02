import { minutesToMilliseconds } from 'date-fns';

import { type TimelineItem, type TimelineRows } from '../types/types.js';

const generateMockItems = (
    count: number,
    duration: number,
): Array<TimelineItem> => {
    return Array.from({ length: count })
        .fill(0)
        .map(() => ({
            id: self.crypto.randomUUID(),
            duration,
        }));
};

const mockItems: TimelineRows = {
    avatar: generateMockItems(5, minutesToMilliseconds(7)),
    script: generateMockItems(8, minutesToMilliseconds(4)),
};

export { mockItems };
