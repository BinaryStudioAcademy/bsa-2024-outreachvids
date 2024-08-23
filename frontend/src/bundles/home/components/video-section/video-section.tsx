import { Badge, Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import { VideoCard } from '../video-card/video-card.js';

const VideoSection: React.FC = () => {
    return (
        <Box padding="17px 28px">
            <Flex alignItems="center" marginBottom="9px">
                <Heading color="typography.900" variant="H3" marginRight="11px">
                    Videos
                </Heading>
                <Badge
                    color="background.600"
                    bg="#D1D4DB"
                    fontWeight="400"
                    padding="2px 10px"
                >
                    23
                </Badge>
            </Flex>
            <SimpleGrid minChildWidth="253px" spacing="20px">
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
            </SimpleGrid>
        </Box>
    );
};

export { VideoSection };
