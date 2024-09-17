import { type PlayerRef, Player as LibraryPlayer } from '@remotion/player';
import { type RefObject } from 'react';

import { Flex } from '~/bundles/common/components/components.js';
import { VideoPreview } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { VideoComponent } from '~/bundles/studio/components/components.js';

import {
    ASPECT_RATIO_LANDSCAPE,
    ASPECT_RATIO_PORTRAIT,
    MIN_DURATION_IN_FRAMES,
} from './constants/constants.js';
import { LandscapeStyle, PortraitStyle } from './styles/styles.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const Player = ({ playerRef }: Properties): JSX.Element => {
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scripts = useAppSelector(({ studio }) => studio.scripts);
    const orientation = useAppSelector(({ studio }) => studio.videoSize);

    const size =
        orientation === VideoPreview.LANDSCAPE
            ? { width: 1920, height: 1080 }
            : { width: 1080, height: 1920 };

    const inputProperties = useMemo(() => {
        return {
            scenes,
            scripts,
        };
    }, [scenes, scripts]);

    const durationInFrames = scenes.reduce(
        (sum, scene) => sum + scene.duration,
        0,
    );

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            maxHeight="60vh"
            height="full"
            bg="background.50"
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
                inputProps={inputProperties}
                durationInFrames={
                    durationInFrames * 30 || MIN_DURATION_IN_FRAMES
                }
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
