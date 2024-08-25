import { minutesToMilliseconds } from 'date-fns';
import  { type ItemDefinition, type Range, type RowDefinition, type Span } from 'dnd-timeline';

const generateMockRows = (count: number): RowDefinition[] => {
	const rows = [0];
	rows.length = count;
	rows.fill(0);
	return rows
		.map((_, index): RowDefinition => {
			const disabled = false;

			let id = `${index + 1}`;
			if (disabled) {
				id += ' (disabled)';
			}

			return {
				id,
				disabled,
			};
		});
};

const getRandomInRange = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};

const DEFAULT_MIN_DURATION = minutesToMilliseconds(1);
const DEFAULT_MAX_DURATION = minutesToMilliseconds(3);

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
        const disabled = false;

        const span = generateRandomSpan(range);

        let id = `${index + 1}`;
        if (disabled) {
            id += ' (disabled)';
        }

        return {
            id,
            rowId: rowId || '',
            span,
            disabled,
        };
    });
};

export { generateMockItems, generateMockRows, generateRandomSpan };