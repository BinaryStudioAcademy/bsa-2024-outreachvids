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
    VideoComponent,
    VideoMenu,
} from '../components/components.js';
import { mockScriptItems } from '../mocks/mock.helper.js';
import { actions as studioActionCreator } from '../store/studio.js';
import styles from './styles.module.css';

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
            <VStack className={styles['timeline']} alignItems={'stretch'}>
                <PlayerControls />
                <Box>
                    <Timeline
                        initialRange={initialRange}
                        initialScriptItems={mockScriptItems}
                    />
                </Box>
            </VStack>

            <Player
                VideoComponent={VideoComponent}
                playerRef={playerReference}
                durationInFrames={300}
            />
        </Box>
    );
};

export { Studio };
