import { Box, Image } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import styles from './styles.module.css';

type Properties = {
    imageSource: string;
};

const ImageCard: React.FC<Properties> = ({ imageSource }) => {
    const dispatch = useAppDispatch();

    const handleImageClick = useCallback((): void => {
        void dispatch(
            studioActions.addBackgroundToScene({
                isValueImage: true,
                value: imageSource,
            }),
        );
    }, [dispatch, imageSource]);

    return (
        <Box className={styles['image-item']} onClick={handleImageClick}>
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
