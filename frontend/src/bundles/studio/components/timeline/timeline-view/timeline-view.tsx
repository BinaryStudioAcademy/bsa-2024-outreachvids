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
    VideoEndingCursor,
} from '../components.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const TimelineView: React.FC<Properties> = ({ playerRef }) => {
    const { setTimelineRef, style } = useTimelineContext();

    return (
        <Box
            ref={setTimelineRef}
            style={{
                ...style,
                overflowX: 'hidden',
                minWidth: 'max-content',
                height: '100%',
            }}
        >
            <TimeAxis markers={timeAxisMarkers} />
            <TimeCursor playerRef={playerRef} />
            <Row id="emptyTop" />
            <ScenesRow />
            <ScriptsRow />
            <Row id="emptyBottom" />
            <VideoEndingCursor />
        </Box>
    );
};

export { TimelineView };
