import { type PlayerRef } from '@remotion/player';

import {
    Box,
    Button,
    Header,
    Icon,
    IconButton,
    Player,
} from '~/bundles/common/components/components.js';
import { VideoPreview } from '~/bundles/common/enums/enums.js';
import { useRef } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { VideoComponent } from '../components/components.js';
import { VideoMenu } from '../components/video-menu/video-menu.js';

const Studio: React.FC = () => {
    const playerReference = useRef<PlayerRef>(null);
    return (
        <Box minHeight="100vh" height="100%" position="relative">
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        sx={{ width: '135px' }}
                    />
                }
                right={
                    <IconButton
                        variant="primaryOutlined"
                        aria-label="Download"
                        icon={<Icon as={IconName.DOWNLOAD} />}
                    />
                }
            />

            <VideoMenu />

            <Player
                VideoComponent={VideoComponent}
                playerRef={playerReference}
                durationInFrames={300}
                orientation={VideoPreview.LANDSCAPE}
            />
        </Box>
    );
};

export { Studio };
