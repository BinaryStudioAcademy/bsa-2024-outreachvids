import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import { type VideoPreview as VideoPreviewT } from '~/bundles/common/types/types.js';

import styles from '../../../../video-modal.module.css';
import {
    VideoPreview as VideoPreviewValues,
    VideoSizeLabel,
} from './libs/enums/enums.js';
import styles from './styles.module.css';

const VideoPreview: React.FC = () => {
    const [view, setView] = useState<VideoPreviewT>(
        VideoPreviewValues.PORTRAIT,
    );

    const handleSetPortraitView = useCallback((): void => {
        setView(VideoPreviewValues.PORTRAIT);
    }, []);

    const handleSetLandscapeView = useCallback((): void => {
        setView(VideoPreviewValues.LANDSCAPE);
    }, []);

    return (
        <Flex className={styles['previewContainer']}>
            <Flex
                className={styles['previewBox']}
                style={{
                    width:
                        view === VideoPreviewValues.PORTRAIT
                            ? '250px'
                            : '720px',
                }}
            >
                <Flex className={styles['previewInnerBox']}>
                    <Icon
                        as={FontAwesomeIcon}
                        icon={faPlay}
                        className={styles['previewIcon']}
                    />
                    <Text className={styles['previewText']}>
                        {view === VideoPreviewValues.PORTRAIT
                            ? VideoSizeLabel.PORTRAIT
                            : VideoSizeLabel.LANDSCAPE}
                    </Text>
                </Flex>
            </Flex>

            <Flex className={styles['previewButtonContainer']}>
                <Link to={AppRoute.STUDIO}>
                    <Button
                        backgroundColor="brand.secondary.300"
                        color="white"
                        onMouseEnter={handleSetLandscapeView}
                        onClick={handleClick}
                        _hover={{ bg: 'brand.secondary.600' }}
                    >
                        Use landscape
                    </Button>
                </Link>
                <Link to={AppRoute.STUDIO}>
                    <Button
                        backgroundColor="brand.secondary.300"
                        color="white"
                        onClick={handleClick}
                        _hover={{ bg: 'brand.secondary.600' }}
                        onMouseEnter={handleSetPortraitView}
                    >
                        Use portrait
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
