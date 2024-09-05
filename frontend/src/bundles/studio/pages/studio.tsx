import { minutesToMilliseconds } from 'date-fns';
import { type Range } from 'dnd-timeline';

import {
    Box,
    Button,
    Header,
    Icon,
    IconButton,
    VStack,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { Timeline } from '../components/timeline/timeline.js';
import { VideoMenu } from '../components/video-menu/video-menu.js';
import { mockItems } from '../mocks/mock.helper.js';
import styles from './styles.module.css';

const initialRange: Range = {
    start: minutesToMilliseconds(0),
    end: minutesToMilliseconds(60),
};

const Studio: React.FC = () => {
    return (
        <>
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
                <Box>
                    <Timeline
                        initialRange={initialRange}
                        initialItems={mockItems}
                    />
                </Box>
            </VStack>
        </>
    );
};

export { Studio };
