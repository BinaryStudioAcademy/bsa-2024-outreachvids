import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import { VideoCard } from '../video-card/video-card.js';

const VideoSection: React.FC = () => {
    return (
        <>
            <Box padding="17px 28px">
                <Flex alignItems="center" marginBottom="9px">
                    <Heading
                        color="typography.900"
                        variant="H3"
                        marginRight="11px"
                    >
                        Videos
                    </Heading>
                    <Box
                        w="34px"
                        h="23px"
                        bg="#D1D4DB"
                        color="background.600"
                        textAlign="center"
                        borderRadius="3px"
                    >
                        23
                    </Box>
                </Flex>
                <SimpleGrid minChildWidth="253px" spacing="20px">
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                </SimpleGrid>
            </Box>
        </>
    );
};

export { VideoSection };
