import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

import { Tab, VideoPreview } from './libs/components/components.js';

const VideoModalContent = (): JSX.Element => {
    return (
        <Tabs orientation="vertical" variant="unstyled" height="full">
            <TabList
                backgroundColor="gray.100"
                padding="20px 20px 20px"
                minWidth="290px"
            >
                <Tab icon={faPlay} label="Start from scratch" />
            </TabList>
            <TabPanels
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <TabPanel>
                    <VideoPreview />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { VideoModalContent };
