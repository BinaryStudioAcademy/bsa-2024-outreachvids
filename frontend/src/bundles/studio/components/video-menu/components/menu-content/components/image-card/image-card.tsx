import { Box, Image } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    imageSource: string;
    onClick: () => void;
};

const ImageCard: React.FC<Properties> = ({ imageSource, onClick }) => {
    return (
        <Box className={styles['image-item']} onClick={onClick}>
            <Image
                src={imageSource}
                objectFit="contain"
                width="100%"
                height="100%"
            ></Image>
        </Box>
    );
};

export { ImageCard };
