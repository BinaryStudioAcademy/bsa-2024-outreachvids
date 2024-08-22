import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import { VideoCard } from '../video-card/video-card.js';

const VideoSection: React.FC = () => {
    return (
        <>
            <Box padding="17px 28px">
                <Heading color="typography.900" variant="H3" marginBottom="9px">
                    Videos
                </Heading>
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
