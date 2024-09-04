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

import { Timeline } from '../components/timeline/timeline.js';
import { VideoMenu } from '../components/video-menu/video-menu.js';

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
            <VStack
                sx={{
                    position: 'fixed',
                    left: '0',
                    bottom: '0',
                    width: '100%',
                    height: '180px',
                    alignItems: 'stretch',
                }}
            >
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
