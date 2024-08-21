import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { Tab, VideoPreview } from './libs/components/components.js';

const VideoModalContent = (): JSX.Element => {
    return (
        <Tabs orientation="vertical" variant="unstyled" height="full">
            <TabList
                backgroundColor="gray.100"
                padding="20px 20px 20px"
                minWidth="290px"
            >
                <Tab label="Start from scratch" />
            </TabList>
            <TabPanels>
                <TabPanel>
                    <VideoPreview />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { VideoModalContent };
