import { type PlayerRef } from '@remotion/player';
import { type RefObject } from 'react';

import { Box } from '~/bundles/common/components/components.js';
import { timeAxisMarkers } from '~/bundles/studio/helpers/time-axis-markers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';

import {
    Row,
    ScenesRow,
    ScriptsRow,
    TimeAxis,
    TimeCursor,
} from '../components.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const TimelineView: React.FC<Properties> = ({ playerRef }) => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box
            ref={setTimelineRef}
            style={{ ...style, overflowX: 'visible', minWidth: 'max-content' }}
        >
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor playerRef={playerRef} />
            <Row id="emptyTop" />
            <ScenesRow />
            <ScriptsRow />
            <Row id="emptyBottom" />
        </Box>
    );
};

export { TimelineView };
