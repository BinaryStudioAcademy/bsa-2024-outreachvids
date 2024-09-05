import { type PlayerRef } from '@remotion/player';
import { minutesToMilliseconds } from 'date-fns';
import {
    type ItemDefinition,
    type Range,
    type RowDefinition,
} from 'dnd-timeline';

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
    generateMockItems,
    generateMockRows,
} from '~/bundles/studio/mocks/mock.helper.js';

import { VideoComponent } from '../components/components.js';
import { Timeline } from '../components/timeline/timeline.js';
import { VideoMenu } from '../components/video-menu/video-menu.js';
import styles from './styles.module.css';

const timezoneOffset = minutesToMilliseconds(new Date().getTimezoneOffset());
const initialRange: Range = {
    start: timezoneOffset,
    end: minutesToMilliseconds(45) + timezoneOffset,
};
const initialRows: RowDefinition[] = generateMockRows(2);
const initialItems: ItemDefinition[] = generateMockItems(
    10,
    initialRange,
    initialRows,
);
import { actions as studioActionCreator } from '../store/studio.js';

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
                <Box>
                    <Timeline
                        initialRange={initialRange}
                        initialItems={initialItems}
                        initialRows={initialRows}
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
