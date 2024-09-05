import { type PlayerRef, Player as LibraryPlayer } from '@remotion/player';
import { type RefObject } from 'react';

import { Flex } from '~/bundles/common/components/components.js';
import { VideoPreview } from '~/bundles/common/enums/enums.js';

import {
    ASPECT_RATIO_LANDSCAPE,
    ASPECT_RATIO_PORTRAIT,
} from './constants/constants.js';
import { LandscapeStyle, PortraitStyle } from './styles/styles.js';

type Properties = {
    orientation: 'landscape' | 'portrait';
    durationInFrames: number;
    playerRef: RefObject<PlayerRef>;
    VideoComponent: React.FC;
};

const Player = ({
    orientation,
    durationInFrames,
    playerRef,
    VideoComponent,
}: Properties): JSX.Element => {
    const size =
        orientation === VideoPreview.LANDSCAPE
            ? { width: 1920, height: 1080 }
            : { width: 1080, height: 1920 };

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            maxHeight="60vh"
            height="full"
            aspectRatio={
                orientation === VideoPreview.LANDSCAPE
                    ? ASPECT_RATIO_LANDSCAPE
                    : ASPECT_RATIO_PORTRAIT
            }
            padding="20px"
        >
            <LibraryPlayer
                ref={playerRef}
                component={VideoComponent}
                durationInFrames={durationInFrames}
                compositionWidth={size.width}
                compositionHeight={size.height}
                fps={30}
                style={
                    orientation === VideoPreview.LANDSCAPE
                        ? LandscapeStyle
                        : PortraitStyle
                }
            />
        </Flex>
    );
};

export { Player };
