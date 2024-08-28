import {
    Heading,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

import { Tab, VideoPreview } from './components/components.js';

const VideoModalContent = (): JSX.Element => {
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
                    <Tab icon={faPlay} label="Start from scratch" />
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
            </TabPanels>
        </Tabs>
    );
};

export { VideoModalContent };
