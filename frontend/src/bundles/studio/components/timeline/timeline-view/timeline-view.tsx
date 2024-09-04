import {
    type ItemDefinition,
    type RowDefinition,
    groupItemsToSubrows,
    useTimelineContext,
} from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';

import { Item, Row, Subrow, TimeAxis, TimeCursor, } from '../components.js';

interface TimelineProperties {
    rows: RowDefinition[];
    items: ItemDefinition[];
}

const TimelineView: React.FC<TimelineProperties> = ({
    rows,
    items,
}): JSX.Element => {
    const { setTimelineRef, style, range } = useTimelineContext();

    const groupedSubrows = useMemo(
        () => groupItemsToSubrows(items, range),
        [items, range],
    );
    return (
        <Box ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />

            {rows.map((row) => (
                <Row id={row.id} key={row.id}>
                    {groupedSubrows[row.id]?.map((subrow, index) => (
                        <Subrow key={`${row.id}-${index}`}>
                            {subrow.map((item) => (
                                <Item
                                    id={item.id}
                                    key={item.id}
                                    span={item.span}
                                >
                                    {`Item ${item.id}`}
                                </Item>
                            ))}
                        </Subrow>
                    ))}
                </Row>
            ))}
        </Box>
    );
};

export { TimelineView };
