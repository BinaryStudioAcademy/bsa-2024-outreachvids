import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { Tab } from './libs/components/components.js';

const VideoModalSideBar = (): JSX.Element => {
    return (
        <Tabs
            orientation="vertical"
            backgroundColor="gray"
            height="full"
            size="lg"
            variant="enclosed"
        >
            <TabList width="30%">
                <Tab label="One" />
                <Tab label="Two" />
                <Tab label="Three" />
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { VideoModalSideBar };
