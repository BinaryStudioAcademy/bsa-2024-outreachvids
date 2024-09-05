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
import { VideoPreview } from '~/bundles/common/enums/enums.js';
import { useRef } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import {
    generateMockItems,
    generateMockRows,
} from '~/bundles/studio/mocks/mock.helper.js';

import {
    PlayerControls,
    Timeline,
    VideoComponent,
    VideoMenu,
} from '../components/components.js';
import styles from './styles.module.css';

const initialRange: Range = {
    start: 0,
    end: minutesToMilliseconds(2),
};
const initialRows: RowDefinition[] = generateMockRows(2);
const initialItems: ItemDefinition[] = generateMockItems(
    5,
    initialRange,
    initialRows,
);

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
            <VStack className={styles['timeline']} alignItems={'stretch'}>
                <PlayerControls />
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
                orientation={VideoPreview.LANDSCAPE}
            />
        </Box>
    );
};

export { Studio };
