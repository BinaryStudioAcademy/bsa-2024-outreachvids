import { format, hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds } from 'date-fns';
import  { type ItemDefinition, type RowDefinition } from 'dnd-timeline';
import { groupItemsToSubrows, useTimelineContext } from 'dnd-timeline';
import { useMemo } from 'react';

import { Item } from './item.js';
import { Row } from './row.js';
import { Subrow } from './subrow.js';
import { type MarkerDefinition } from './timeaxis.js';
import { TimeAxis } from './timeaxis.js';
import { TimeCursor } from './timecursor.js';

const timeAxisMarkers: MarkerDefinition[] = [
    {
        value: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(2),
        minRangeSize: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(1),
        minRangeSize: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(1),
        maxRangeSize: hoursToMilliseconds(24),
        getLabel: (date: Date) => format(date, 'k'),
    },
    {
        value: minutesToMilliseconds(30),
        maxRangeSize: hoursToMilliseconds(24),
        minRangeSize: hoursToMilliseconds(12),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(15),
        maxRangeSize: hoursToMilliseconds(12),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(5),
        maxRangeSize: hoursToMilliseconds(6),
        minRangeSize: hoursToMilliseconds(3),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(5),
        maxRangeSize: hoursToMilliseconds(3),
        minRangeSize: hoursToMilliseconds(1),
        getLabel: (date: Date) => format(date, 'HH:mm'),
    },
    {
        value: secondsToMilliseconds(30),
        maxRangeSize: minutesToMilliseconds(30),
        minRangeSize: minutesToMilliseconds(10),
        getLabel: (date: Date) => format(date, 'mm:ss'),
    },
    {
        value: 1000,
        maxRangeSize: minutesToMilliseconds(10),
        minRangeSize: minutesToMilliseconds(1),
        getLabel: (date: Date) => format(date, 's'),
    },
];

interface TimelineProperties {
    rows: RowDefinition[];
    items: ItemDefinition[];
}

const TimelineView = (properties: TimelineProperties): JSX.Element => {
    const { setTimelineRef, style, range } = useTimelineContext();

    const groupedSubrows = useMemo(
        () => groupItemsToSubrows(properties.items, range),
        [properties.items, range],
    );
    return (
        <div ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />

            {properties.rows.map((row) => (
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