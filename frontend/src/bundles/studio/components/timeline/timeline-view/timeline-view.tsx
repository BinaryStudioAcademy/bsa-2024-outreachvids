import { Box } from '~/bundles/common/components/components.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/types.js';

import {
    Row,
    ScenesRow,
    ScriptsRow,
    TimeAxis,
    TimeCursor,
} from '../components.js';

type Properties = {
    scriptItems: TimelineItemWithSpan[];
};

const TimelineView: React.FC<Properties> = ({ scriptItems }) => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />
            <Row id="emptyTop" />
            <ScenesRow />
            <ScriptsRow items={scriptItems} />
            <Row id="emptyBottom" />
        </Box>
    );
};

export { TimelineView };
