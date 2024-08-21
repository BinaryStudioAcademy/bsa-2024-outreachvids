import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { VideoPreview as VideoPreviewValues } from './libs/enums/enums.js';
import { type VideoPreview as VideoPreviewType } from './libs/types/types.js';

const VideoPreview = (): JSX.Element => {
    const [view, setView] = useState<VideoPreviewType>(
        VideoPreviewValues.PORTRAIT,
    );

    const setPortraitView = useCallback((): void => {
        setView(VideoPreviewValues.PORTRAIT);
    }, []);

    const setLandscapeView = useCallback((): void => {
        setView(VideoPreviewValues.LANDSCAPE);
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center">
            <Box
                width={view === VideoPreviewValues.PORTRAIT ? '250px' : '720px'}
                height="444px"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
            >
                <Text color="gray.400">
                    {view === VideoPreviewValues.PORTRAIT
                        ? '1080 x 1920'
                        : '1920 x 1080'}
                </Text>
            </Box>

            <Flex justifyContent="center" gap={4}>
                <Button
                    backgroundColor="brand.secondary.300"
                    color="white"
                    onMouseEnter={setLandscapeView}
                    _hover={{ bg: 'brand.secondary.600' }}
                >
                    Use landscape
                </Button>
                <Button
                    backgroundColor="brand.secondary.300"
                    color="white"
                    onMouseEnter={setPortraitView}
                    _hover={{ bg: 'brand.secondary.600' }}
                >
                    Use portrait
                </Button>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
