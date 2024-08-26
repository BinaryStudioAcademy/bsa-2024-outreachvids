
import  { type ItemDefinition, type RowDefinition, groupItemsToSubrows, useTimelineContext } from 'dnd-timeline';
import {} from 'dnd-timeline';
import { useMemo } from 'react';

import { timeAxisMarkers } from '../../../helpers/time-axis-markers.js';
import { Item } from './item.js';
import { Row } from './row.js';
import { Subrow } from './subrow.js';
import { TimeAxis } from './timeaxis.js';
import { TimeCursor } from './timecursor.js';

interface TimelineProperties {
    rows: RowDefinition[];
    items: ItemDefinition[];
}

const TimelineView: React.FC<TimelineProperties> = ({ rows, items }) => {
    const { setTimelineRef, style, range } = useTimelineContext();

    const groupedSubrows = useMemo(
        () => groupItemsToSubrows(items, range),
        [items, range],
    );
    return (
        <div ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />

            {rows.map((row) => (
                <Row id={row.id} key={row.id} >
                    {groupedSubrows[row.id]?.map((subrow, index) => (
                        <Subrow key={`${row.id}-${index}`}>
                            {subrow.map((item) => (
                                <Item id={item.id} key={item.id} span={item.span}>
                                    {`Item ${item.id}`}
                                </Item>
                            ))}
                        </Subrow>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export { TimelineView };