import {
    type RowType,
    type TimelineItem,
    type TimelineItemWithSpan,
} from '~/bundles/studio/types/types.js';

type TimelineRows = Record<RowType, Array<TimelineItem>>;
type TimelineRowsWithSpan = Record<RowType, Array<TimelineItemWithSpan>>;

export { type TimelineRows, type TimelineRowsWithSpan };
