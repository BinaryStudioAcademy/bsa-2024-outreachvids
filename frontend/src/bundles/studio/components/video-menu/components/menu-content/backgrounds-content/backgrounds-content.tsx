import {
    Box,
    Image,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '~/bundles/common/components/components.js';

import { backgroundColors, backgroundImages } from '../../mock/bg-mock.js';
import styles from './styles.module.css';

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
                                <Box
                                    key={index}
                                    className={styles['image-item']}
                                >
                                    <Image
                                        src={imageSource}
                                        objectFit="contain"
                                        width="100%"
                                        height="100%"
                                    ></Image>
                                </Box>
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
