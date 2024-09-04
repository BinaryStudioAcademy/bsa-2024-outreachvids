import { useTimelineContext } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import {
    type DestinationPointer,
    type TimelineRowsWithSpan,
} from '~/bundles/studio/types/types.js';

import { Row, TimeAxis, TimeCursor } from '../components.js';
import { AvatarsRow } from '../row/avatars-row.js';
import { ScriptsRow } from '../row/scripts-row.js';

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
            <Row id="emptyTop" />
            <AvatarsRow
                items={items[RowNames.AVATAR]}
                destinationPointerValue={
                    destinationPointer?.type === RowNames.AVATAR
                        ? destinationPointer?.value
                        : undefined
                }
            />
            <ScriptsRow
                items={items[RowNames.SCRIPT]}
                destinationPointerValue={
                    destinationPointer?.type === RowNames.SCRIPT
                        ? destinationPointer?.value
                        : undefined
                }
            />
            <Row id="emptyBottom" />
        </Box>
    );
};

export { TimelineView };
