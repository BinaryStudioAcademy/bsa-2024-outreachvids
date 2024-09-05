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
    VStack,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import {
    generateMockItems,
    generateMockRows,
} from '~/bundles/studio/mocks/mock.helper.js';

import {
    PlayerControls,
    Timeline,
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
    return (
        <>
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        className={styles['resizeButton']}
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
        </>
    );
};

export { Studio };