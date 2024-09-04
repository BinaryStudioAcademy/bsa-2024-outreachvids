import { type PlayerRef } from '@remotion/player';

import {
    Box,
    Button,
    Header,
    Icon,
    IconButton,
    Player,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useRef,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { VideoMenu } from '../components/video-menu/video-menu.js';
import { actions as studioActionCreator } from '../store/studio.js';
import { VideoComponent } from './components/video.js';

const Studio: React.FC = () => {
    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();

    const handleResize = useCallback(() => {
        dispatch(studioActionCreator.changeVideoSize());
    }, [dispatch]);

    return (
        <Box minHeight="100vh" height="100%" position="relative">
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        sx={{ width: '135px' }}
                        onClick={handleResize}
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
            />
        </Box>
    );
};

export { Studio };
