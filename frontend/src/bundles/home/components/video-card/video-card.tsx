import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import photo from '~/assets/img/photo.png';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Image,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './video-card.module.css';

const VideoCard: React.FC = () => {
    return (
        <Box className={styles['container']}>
            <Box className={styles['imageContainer']} role="group">
                <Image src={photo} alt="Video preview" className={styles['image']} />

                {/* Overlay effect */}
                <Box
                    className={styles['overlay']}
                    _groupHover={{ opacity: 1 }}
                />

                <IconButton
                    aria-label="Video options"
                    className={`${styles['iconButton']} ${styles['iconButtonTopRight']}`}
                    _groupHover={{ opacity: 1 }}
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.OPTIONS_VERTICAL}
                            color="background.600"
                        />
                    }
                />

                <IconButton
                    aria-label="Edit video"
                    isRound={true}
                    className={`${styles['iconButton']} ${styles['iconButtonCenter']}`}
                    _groupHover={{ opacity: 1 }}
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.PEN}
                            color="background.600"
                        />
                    }
                />
            </Box>

            <Box className={styles['textContainer']}>
                <Text variant="button" className={styles['textButton']}>
                    Video Name
                </Text>
                <Flex justify="space-between">
                    <Text variant="caption" className={styles['textCaption']}>
                        Aug 9, 2024, 1:24 PM
                    </Text>
                    <Text variant="caption" className={styles['textCaption']}>
                        0,30 sec
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

export { VideoCard };