import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import styles from '~/bundles/common/components/video-modal/styles.module.css';
import { type VideoPreview as VideoPreviewT } from '~/bundles/common/types/types.js';

import {
    VideoPreview as VideoPreviewValues,
    VideoSizeLabel,
} from './libs/enums/enums.js';

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
                <Button
                    backgroundColor="brand.secondary.300"
                    color="white"
                    onMouseEnter={handleSetLandscapeView}
                    _hover={{ bg: 'brand.secondary.600' }}
                >
                    Use landscape
                </Button>
                <Button
                    backgroundColor="brand.secondary.300"
                    color="white"
                    _hover={{ bg: 'brand.secondary.600' }}
                    onMouseEnter={handleSetPortraitView}
                >
                    Use portrait
                </Button>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
