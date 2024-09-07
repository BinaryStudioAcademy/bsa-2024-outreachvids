import { secondsToMilliseconds } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { type TimelineItem, type TimelineRows } from '../types/types.js';

const generateMockItems = (
    count: number,
    duration: number,
): Array<TimelineItem> => {
    return Array.from({ length: count })
        .fill(0)
        .map(() => ({
            id: uuidv4(),
            duration,
        }));
};

const mockItems: TimelineRows = {
    avatar: generateMockItems(5, secondsToMilliseconds(15)),
    script: generateMockItems(8, secondsToMilliseconds(10)),
};

export { mockItems };
