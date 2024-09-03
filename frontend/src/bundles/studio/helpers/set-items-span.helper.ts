import { type RowType } from '~/bundles/studio/types/types.js';

import {
    type TimelineItem,
    type TimelineRows,
    type TimelineRowsWithSpan,
} from '../types/types.js';

const setItemsSpan = (
    rows: TimelineRows | TimelineRowsWithSpan,
): TimelineRowsWithSpan => {
    const mappedRows = {} as TimelineRowsWithSpan;

    for (const rowName in rows) {
        let start = 0;

        mappedRows[rowName as RowType] = rows[rowName as RowType].map(
            (item: TimelineItem) => {
                const updatedItem = {
                    ...item,
                    span: { start, end: start + item.duration },
                };

                start += item.duration;

                return updatedItem;
            },
        );
    }

    return mappedRows;
};

export { setItemsSpan };
