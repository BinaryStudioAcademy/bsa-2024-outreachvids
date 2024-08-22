import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import {
    VideoPreview as VideoPreviewValues,
    VideoSizeLabel,
} from './libs/enums/enums.js';
import { type VideoPreview as VideoPreviewType } from './libs/types/types.js';

const VideoPreview = (): JSX.Element => {
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
        <Flex flexDirection="column" alignItems="center">
            <Flex
                width={view === VideoPreviewValues.PORTRAIT ? '250px' : '720px'}
                height="444px"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                mb={4}
            >
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="gray.400"
                >
                    <Icon
                        as={FontAwesomeIcon}
                        icon={faPlay}
                        padding="5px"
                        height="16px"
                    />
                    <Text color="gray.400">
                        {view === VideoPreviewValues.PORTRAIT
                            ? VideoSizeLabel.PORTRAIT
                            : VideoSizeLabel.LANDSCAPE}
                    </Text>
                </Flex>
            </Flex>

            <Flex justifyContent="center" gap={4}>
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
                    onMouseEnter={handleSetPortraitView}
                    _hover={{ bg: 'brand.secondary.600' }}
                >
                    Use portrait
                </Button>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
