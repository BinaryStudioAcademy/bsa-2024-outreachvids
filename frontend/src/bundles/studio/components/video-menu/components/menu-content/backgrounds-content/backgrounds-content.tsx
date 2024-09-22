import {
    Box,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '~/bundles/common/components/components.js';

import { backgroundColors, backgroundImages } from '../../mock/bg-mock.js';
import { ImageCard } from './components/components.js';

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
                                <Box
                                    key={index}
                                    backgroundColor={color}
                                    height="80px"
                                ></Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { BackgroundsContent };
