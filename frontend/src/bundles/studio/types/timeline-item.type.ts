import { type Span } from 'dnd-timeline';

type TimelineItem = {
    id: string;
    duration: number;
};

type TimelineItemWithSpan = TimelineItem & { span: Span };

export { type TimelineItem, type TimelineItemWithSpan };
