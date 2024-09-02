import { useTimelineContext } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import { type TimelineRowsWithSpan } from '~/bundles/studio/types/types.js';

import { AvatarsRow } from '../row/avatars-row.js';
import { Row } from '../row/row.js';
import { ScriptsRow } from '../row/scripts-row.js';
import { TimeAxis } from '../timeaxis/timeaxis.js';
import { TimeCursor } from '../timecursor/timecursor.js';

interface TimelineProperties {
    items: TimelineRowsWithSpan;
}

const TimelineView: React.FC<TimelineProperties> = ({ items }): JSX.Element => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />
            <Row id="empty" disabled />
            <AvatarsRow items={items[RowNames.AVATAR]} />
            <ScriptsRow items={items[RowNames.SCRIPT]} />
            <Row id="empty" disabled />
        </Box>
    );
};

export { TimelineView };
