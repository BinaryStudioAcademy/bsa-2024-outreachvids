import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import photo from '~/assets/img/photo.png';

const VideoCard: React.FC = () => {
    return (
        <>
            <Box borderRadius="8px" bg="white" padding="7px">
                <Box position="relative" role="group">
                    <Image src={photo} alt="Video preview" borderRadius="5px" />

                    {/* Overlay effect */}
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        bg="rgba(53, 57, 154, 0.3)"
                        opacity="0"
                        transition="opacity 0.3s ease"
                        _groupHover={{ opacity: 1 }}
                        borderRadius="5px"
                    />

                    <Flex
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        backgroundColor="white"
                        borderRadius="full"
                        w="48px"
                        h="48px"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        transition="opacity 0.3s ease"
                        _groupHover={{ opacity: 1 }}
                    >
                        <Icon
                            as={FontAwesomeIcon}
                            icon={faPen}
                            height="20px"
                            width="20px"
                            color="background.600"
                        />
                    </Flex>
                </Box>

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
