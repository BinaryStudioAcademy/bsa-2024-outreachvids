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
import { VideoPreview } from '~/bundles/common/enums/enums.js';
import { useRef } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import {
    PlayerControls,
    Timeline,
    VideoComponent,
    VideoMenu,
} from '../components/components.js';
import { mockItems } from '../mocks/mock.helper.js';
import styles from './styles.module.css';

const initialRange: Range = {
    start: minutesToMilliseconds(0),
    end: minutesToMilliseconds(2),
};

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
                        initialItems={mockItems}
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
