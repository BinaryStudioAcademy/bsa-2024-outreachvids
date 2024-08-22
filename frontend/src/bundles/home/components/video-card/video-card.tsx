import { Box, Flex, Image, Text } from '@chakra-ui/react';

import photo from '~/assets/img/photo.png';

const VideoCard: React.FC = () => {
    return (
        <>
            <Box borderRadius="8px" bg="white" padding="7px">
                <Image src={photo} alt="Video preview" borderRadius="5px" />
                <Box padding="7px 10px 5px 5px">
                    <Text variant="button" color="typography.900">
                        Video Name
                    </Text>
                    <Flex justify="space-between">
                        <Text variant="caption" color="typography.300">
                            Aug 9, 2024, 1:24 PM
                        </Text>
                        <Text variant="caption" color="typography.300">
                            0,30 sec
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export { VideoCard };
