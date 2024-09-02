import {
    type ItemDefinition,
    groupItemsToRows,
    useTimelineContext,
} from 'dnd-timeline';

import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';

import { ItemType } from '../enums/enums.js';
import { Item } from '../item/item.js';
import { Row } from '../row/row.js';
import { TimeAxis } from '../timeaxis/timeaxis.js';
import { TimeCursor } from '../timecursor/timecursor.js';

interface TimelineProperties {
    items: ItemDefinition[];
}

const TimelineView: React.FC<TimelineProperties> = ({ items }): JSX.Element => {
    const { setTimelineRef, style, range } = useTimelineContext();

    const groupedItems = useMemo(
        () => groupItemsToRows(items, range),
        [items, range],
    );

    return (
        <div ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />
            <Row id="empty" disabled />
            <Row id="avatars" type={ItemType.AVATAR} style={{ height: '60px' }}>
                {groupedItems['avatars']?.map((item: ItemDefinition) => (
                    <Item key={item.id} type={ItemType.AVATAR} {...item}>
                        {`Item ${item.id}`}
                    </Item>
                ))}
            </Row>
            <Row id="scripts" type={ItemType.SCRIPT} style={{ height: '35px' }}>
                {groupedItems['scripts']?.map((item: ItemDefinition) => (
                    <Item key={item.id} type={ItemType.SCRIPT} {...item}>
                        {`Item ${item.id}`}
                    </Item>
                ))}
            </Row>
            <Row id="empty" disabled />
        </div>
    );
};

export { TimelineView };
