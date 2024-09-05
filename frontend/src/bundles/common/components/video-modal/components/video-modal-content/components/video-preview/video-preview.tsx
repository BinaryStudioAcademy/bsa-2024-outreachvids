import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import styles from '../../../../video-modal.module.css';
import {
    VideoPreview as VideoPreviewValues,
    VideoSizeLabel,
} from './libs/enums/enums.js';
import { type VideoPreview as VideoPreviewType } from './libs/types/types.js';

const VideoPreview: React.FC = () => {
    const [view, setView] = useState<VideoPreviewType>(
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
                style={{ width: view === VideoPreviewValues.PORTRAIT ? '250px' : '720px' }}
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
                    className={styles['previewButton']}
                    onMouseEnter={handleSetLandscapeView}
                >
                    Use landscape
                </Button>
                <Button
                    className={styles['button']}
                    onMouseEnter={handleSetPortraitView}
                >
                    Use portrait
                </Button>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
