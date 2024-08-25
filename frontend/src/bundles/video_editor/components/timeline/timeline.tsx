import { type DragEndEvent, type ItemDefinition, type Range, type ResizeEndEvent,type RowDefinition  } from 'dnd-timeline';
import { TimelineContext  } from 'dnd-timeline';
import { useCallback, useState } from 'react';

import { TimelineView } from './subcomponents/timeline-view.js';

interface TimelineProperties {
	initialRange: Range;
	initialRows: RowDefinition[];
	initialItems: ItemDefinition[];
  }

  const Timeline: React.FC<TimelineProperties> = ({ initialRange, initialRows, initialItems }) => {

	const [range, setRange] = useState(initialRange);
	const [rows] = useState(initialRows);
	const [items, setItems] = useState(initialItems);

	const onResizeEnd = useCallback((event: ResizeEndEvent) => {
		const updatedSpan =
			event.active.data.current.getSpanFromResizeEvent?.(event);

		if (!updatedSpan) {return;}

		const activeItemId = event.active.id;

		setItems((previous) =>
			previous.map((item) => {
				if (item.id !== activeItemId) {return item;}

				return {
					...item,
					span: updatedSpan,
				};
			}),
		);
	}, []);
	const onDragEnd = useCallback((event: DragEndEvent) => {
		const activeRowId = event.over?.id as string;
		const updatedSpan = event.active.data.current.getSpanFromDragEvent?.(event);

		if (!updatedSpan || !activeRowId) {return;}

		const activeItemId = event.active.id;

		setItems((previous) =>
			previous.map((item) => {
				if (item.id !== activeItemId) {return item;}

				return {
					...item,
					rowId: activeRowId,
					span: updatedSpan,
				};
			}),
		);
	}, []);

	return (
		<TimelineContext
			range={range}
			onDragEnd={onDragEnd}
			onResizeEnd={onResizeEnd}
			onRangeChanged={setRange}
		>
			<TimelineView items={items} rows={rows} />
		</TimelineContext>
	);
};

export { Timeline };