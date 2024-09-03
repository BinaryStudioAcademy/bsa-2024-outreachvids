import { useTimelineContext } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import {
    type DestinationPointer,
    type TimelineRowsWithSpan,
} from '~/bundles/studio/types/types.js';

import { AvatarsRow } from '../row/avatars-row.js';
import { Row } from '../row/row.js';
import { ScriptsRow } from '../row/scripts-row.js';
import { TimeAxis } from '../timeaxis/timeaxis.js';
import { TimeCursor } from '../timecursor/timecursor.js';

type Properties = {
    items: TimelineRowsWithSpan;
    destinationPointer: DestinationPointer | null;
};

const TimelineView: React.FC<Properties> = ({ items, destinationPointer }) => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />
            <Row id="empty" />
            <AvatarsRow
                items={items[RowNames.AVATAR]}
                destinationPointer={
                    destinationPointer?.type === RowNames.AVATAR
                        ? destinationPointer
                        : null
                }
            />
            <ScriptsRow
                items={items[RowNames.SCRIPT]}
                destinationPointer={
                    destinationPointer?.type === RowNames.SCRIPT
                        ? destinationPointer
                        : null
                }
            />
            <Row id="empty" />
        </Box>
    );
};

export { TimelineView };
