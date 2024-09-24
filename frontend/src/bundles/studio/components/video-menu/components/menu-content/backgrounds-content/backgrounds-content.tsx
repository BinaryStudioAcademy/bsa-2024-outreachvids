import {
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '~/bundles/common/components/components.js';
// TODO: Make endpoint for this
import backgroundColors from '~/bundles/studio/data/bg-colors.json';
import backgroundImages from '~/bundles/studio/data/bg-images.json';

import { ColorCard, ImageCard } from './components/components.js';

const BackgroundsContent: React.FC = () => {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Images</Tab>
                    <Tab>Colors</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <SimpleGrid columns={2} spacingX="13px" spacingY="10px">
                            {backgroundImages.map((imageSource, index) => (
                                <ImageCard
                                    key={index}
                                    imageSource={imageSource}
                                />
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <SimpleGrid columns={3} spacingX="13px" spacingY="10px">
                            {backgroundColors.map((color, index) => (
                                <ColorCard key={index} color={color} />
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { BackgroundsContent };
