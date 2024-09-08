import { v4 as uuidv4 } from 'uuid';

import { MIN_SCRIPT_DURATION } from '../constants/constants.js';
import { type TimelineItem } from '../types/types.js';

// TODO: remove when timeline will use scripts from store
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

const mockScriptItems: Array<TimelineItem> = generateMockItems(
    8,
    MIN_SCRIPT_DURATION,
);

export { mockScriptItems };
