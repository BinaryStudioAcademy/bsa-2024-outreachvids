import { Box } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { type TimelineRowsWithSpan } from '~/bundles/studio/types/types.js';

import {
    Row,
    ScenesRow,
    ScriptsRow,
    TimeAxis,
    TimeCursor,
} from '../components.js';

type Properties = {
    items: TimelineRowsWithSpan;
};

const TimelineView: React.FC<Properties> = ({ items }) => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box ref={setTimelineRef} style={style}>
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor />
            <Row id="emptyTop" />
            <ScenesRow items={items[RowNames.SCENE]} />
            <ScriptsRow items={items[RowNames.SCRIPT]} />
            <Row id="emptyBottom" />
        </Box>
    );
};

export { TimelineView };
