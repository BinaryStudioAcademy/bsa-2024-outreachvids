import {
    Heading,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';

import { IconName } from '~/bundles/common/icons/icons.js';

import {
    GenerateScriptView,
    Tab,
    VideoPreview,
} from './components/components.js';

type Properties = {
    onClose: () => void;
};
const VideoModalContent: React.FC<Properties> = ({ onClose }) => {
    return (
        <Tabs orientation="vertical" variant="unstyled" height="full">
            <VStack gap={0}>
                <Heading
                    width="290px"
                    padding="33px 44px 0px"
                    variant="H3"
                    color="typography.900"
                    backgroundColor="gray.100"
                >
                    Create video
                </Heading>
                <TabList
                    backgroundColor="gray.100"
                    padding="20px"
                    minWidth="290px"
                    h="full"
                >
                    <Tab icon={IconName.PLAY} label="Start from scratch" />
                    <Tab
                        icon={IconName.FILE_LINES}
                        label="Generate script with AI"
                    />
                </TabList>
            </VStack>
            <TabPanels>
                <TabPanel
                    h="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <VideoPreview />
                </TabPanel>
                <TabPanel p="0px 24px">
                    <GenerateScriptView onClose={onClose} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { VideoModalContent };
