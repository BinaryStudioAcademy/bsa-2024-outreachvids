import {
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '~/bundles/common/components/components.js';

import { TemplateCard } from './components/components.js';

const TemplatesContent: React.FC = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Templates</Tab>
                <Tab>My templates</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <SimpleGrid columns={2} spacingX="13px" spacingY="10px">
                        <TemplateCard imageSource="https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352836443.jpg" />
                        <TemplateCard imageSource="https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727353097406.jpg" />
                        <TemplateCard imageSource="https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727353044738.jpg" />
                        <TemplateCard imageSource="https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352905018.jpg" />
                        <TemplateCard imageSource="https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352956648.jpg" />
                    </SimpleGrid>
                </TabPanel>
                <TabPanel>
                    <Text color="typography.600" variant="body1">
                        You have no templates yet.
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export { TemplatesContent };
