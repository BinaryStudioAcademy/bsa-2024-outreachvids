import { secondsToMilliseconds } from 'date-fns';
import {
    type ItemDefinition,
    type Range,
    type RowDefinition,
    type Span,
} from 'dnd-timeline';

const generateMockRows = (count: number): RowDefinition[] => {
    return Array.from({ length: count })
        .fill(0)
        .map((_, index): RowDefinition => {
            const id = `${index + 1}`;
            return {
                id,
            };
        });
};

const getRandomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

const DEFAULT_MIN_DURATION = secondsToMilliseconds(10);
const DEFAULT_MAX_DURATION = secondsToMilliseconds(20);

const generateRandomSpan = (
    range: Range,
    minDuration: number = DEFAULT_MIN_DURATION,
    maxDuration: number = DEFAULT_MAX_DURATION,
): Span => {
    const duration = getRandomInRange(minDuration, maxDuration);

    const start = getRandomInRange(range.start, range.end - duration);

    const end = start + duration;

    return {
        start: start,
        end: end,
    };
};

const generateMockItems = (
    count: number,
    range: Range,
    rows: RowDefinition[],
): ItemDefinition[] => {
    const items = Array.from({ length: count }).fill(0);

    return items.map((_, index): ItemDefinition => {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const rowId = row?.id;

        const span = generateRandomSpan(range);

        const id = `${index + 1}`;

        return {
            id,
            rowId: rowId ?? '',
            span,
        };
    });
};

export { generateMockItems, generateMockRows, generateRandomSpan };
