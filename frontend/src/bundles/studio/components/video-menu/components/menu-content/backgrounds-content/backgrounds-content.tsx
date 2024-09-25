import {
    Flex,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
// TODO: Make endpoint for this
import backgroundColors from '~/bundles/studio/data/bg-colors.json';
import backgroundImages from '~/bundles/studio/data/bg-images.json';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { ColorCard, ImageCard } from './components/components.js';
import styles from './styles.module.css';

const BackgroundsContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleRemoveBackground = useCallback((): void => {
        dispatch(studioActions.removeBackgroundFromScene());
    }, [dispatch]);

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
                            <Flex
                                className={styles['none-item']}
                                height="100px"
                                onClick={handleRemoveBackground}
                            >
                                <Text variant="body1">None</Text>
                            </Flex>

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
                            <Flex
                                className={styles['none-item']}
                                height="80px"
                                onClick={handleRemoveBackground}
                            >
                                <Text variant="body1">None</Text>
                            </Flex>

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
