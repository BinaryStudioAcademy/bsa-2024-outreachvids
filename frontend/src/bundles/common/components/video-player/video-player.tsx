import { getVideoMetadata } from '@remotion/media-utils';
import { type PlayerRef, Player } from '@remotion/player';

import { Box } from '~/bundles/common/components/components.js';
import { FPS } from '~/bundles/common/constants/constants.js';
import { useEffect, useRef, useState } from '~/bundles/common/hooks/hooks.js';
import { notificationService } from '~/bundles/common/services/services.js';

import { Control, UserVideo } from './components/components.js';
import { ErrorId, ErrorMessage, ErrorTitle } from './libs/enums/enums.js';
import { type VideoDuration } from './libs/types/types.js';

type Properties = {
    videoSource: string;
    className: string;
    playerWidth: string;
    playerHeight: string;
};

const VideoPlayer: React.FC<Properties> = ({
    videoSource,
    className,
    playerWidth,
    playerHeight,
}) => {
    const videoPlayerReference = useRef<PlayerRef>(null);

    const [duration, setDuration] = useState<VideoDuration>({
        inFrames: 1,
        inSeconds: 1,
    });

    useEffect(() => {
        if (!videoPlayerReference.current) {
            return;
        }
        getVideoMetadata(videoSource)
            .then(({ durationInSeconds }) => {
                setDuration({
                    inFrames: Math.round(durationInSeconds * FPS),
                    inSeconds: Math.round(durationInSeconds),
                });
            })
            .catch(() => {
                notificationService.error({
                    id: ErrorId.METADATA,
                    title: ErrorTitle.METADATA,
                    message: ErrorMessage.METADATA,
                });
            });
    }, [videoSource]);

    return (
        <Box className={className}>
            <Player
                component={UserVideo}
                inputProps={{ src: videoSource }}
                ref={videoPlayerReference}
                durationInFrames={duration.inFrames}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={FPS}
                style={{
                    width: playerWidth,
                    height: playerHeight,
                }}
            />

            <Control
                duration={duration}
                videoPlayerReference={videoPlayerReference}
            />
        </Box>
    );
};

export { VideoPlayer };
