import { type PlayerRef } from '@remotion/player';
import { minutesToMilliseconds } from 'date-fns';
import { type Range } from 'dnd-timeline';

import {
    Box,
    Button,
    Header,
    Icon,
    IconButton,
    Player,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useRef,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import {
    PlayerControls,
    Timeline,
    VideoMenu,
} from '../components/components.js';
import { actions as studioActionCreator } from '../store/studio.js';

const initialRange: Range = {
    start: minutesToMilliseconds(0),
    end: minutesToMilliseconds(2),
};

const Studio: React.FC = () => {
    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();

    const handleResize = useCallback(() => {
        dispatch(studioActionCreator.changeVideoSize());
    }, [dispatch]);

    return (
        <Box
            minHeight="100vh"
            height="100%"
            position="relative"
            display="flex"
            flexDirection="column"
        >
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
            <Box flex="1 1 auto">
                <Player playerRef={playerReference} />
            </Box>

            <VStack alignItems={'stretch'}>
                <PlayerControls playerRef={playerReference} />
                <Box>
                    <Timeline
                        initialRange={initialRange}
                        playerRef={playerReference}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export { Studio };
