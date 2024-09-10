import { getVideoMetadata } from '@remotion/media-utils';
import { type PlayerRef, Player } from '@remotion/player';

import { Box } from '~/bundles/common/components/components.js';
import { useEffect, useRef, useState } from '~/bundles/common/hooks/hooks.js';
import { notificationService } from '~/bundles/common/services/services.js';

import { Control, UserVideo } from './components/components.js';
import { FPS } from './libs/constants/constants.js';
import { ErrorId, ErrorMessage, ErrorTitle } from './libs/enums/enums.js';
import { type VideoDuration } from './libs/types/types.js';

type Properties = {
    videoSource: string;
};

const VideoPlayer: React.FC<Properties> = ({ videoSource }) => {
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
        <Box
            height="278px"
            width="570px"
            border="2px solid transparent"
            boxSizing="content-box"
            position="relative"
            borderRadius="12px"
            backgroundColor="gray.200"
            overflow="hidden"
            transition="0.3s"
            _hover={{
                borderColor: 'background.900',
            }}
        >
            <Player
                component={UserVideo}
                inputProps={{ src: videoSource }}
                ref={videoPlayerReference}
                durationInFrames={duration.inFrames}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={FPS}
                style={{
                    width: '570px',
                    height: '278px',
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
