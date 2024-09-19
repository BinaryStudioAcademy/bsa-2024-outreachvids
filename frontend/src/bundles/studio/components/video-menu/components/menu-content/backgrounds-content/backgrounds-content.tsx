import {
    Box,
    Image,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';

import { backgroundImages } from '../../mock/bg-images-mock.js';
import styles from './styles.module.css';

const BackgroundsContent: React.FC = () => {
    return (
        <>
            <Text variant="body1" mb="12px">
                Images
            </Text>
            <SimpleGrid columns={2} spacingX="13px" spacingY="10px">
                {backgroundImages.map((imageSource, index) => (
                    <Box key={index} className={styles['image-item']}>
                        <Image
                            src={imageSource}
                            objectFit="contain"
                            width="100%"
                            height="100%"
                        ></Image>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    );
};

export { BackgroundsContent };
