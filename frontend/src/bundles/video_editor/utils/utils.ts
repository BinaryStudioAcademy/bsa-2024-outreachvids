import { minutesToMilliseconds } from 'date-fns';
import  { type ItemDefinition, type Range, type RowDefinition, type Span } from 'dnd-timeline';
import { nanoid } from 'nanoid';

const generateMockRows = (count: number): RowDefinition[] => {
	const rows = [0];
	rows.length = count;
	rows.fill(0);
	return rows
		.map((): RowDefinition => {
			const disabled = false;

			let id = `row-${nanoid(4)}`;
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

const DEFAULT_MIN_DURATION = minutesToMilliseconds(60);
const DEFAULT_MAX_DURATION = minutesToMilliseconds(360);

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

function generateMockItems(
    count: number,
    range: Range,
    rows: RowDefinition[],
    
): ItemDefinition[] {
    const items = Array.from({ length: count }).fill(0);

    return items
        .map(function(): ItemDefinition {
            const row = rows[Math.floor(Math.random() * rows.length)];
			const rowId = row?.id;
            const disabled = false;

            const span = generateRandomSpan(
                range,
            );

            let id = `item-${nanoid(4)}`;
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
}

export { generateMockItems, generateMockRows, generateRandomSpan };