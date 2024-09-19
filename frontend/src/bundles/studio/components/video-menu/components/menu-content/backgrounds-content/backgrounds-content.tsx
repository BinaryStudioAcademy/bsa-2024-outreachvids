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

import { backgroundImages } from '../../mock/bg-images-mock.js';
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
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { BackgroundsContent };
