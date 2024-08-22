import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

const VideoSection: React.FC = () => {
    return (
        <>
            <Box padding="17px 28px">
                <Heading color="typography.900" variant="H3" marginBottom="9px">
                    Videos
                </Heading>
                <SimpleGrid minChildWidth="253px" spacing="20px">
                    <Box bg="tomato" height="80px"></Box>
                    <Box bg="tomato" height="80px"></Box>
                    <Box bg="tomato" height="80px"></Box>
                    <Box bg="tomato" height="80px"></Box>
                    <Box bg="tomato" height="80px"></Box>
                    <Box bg="tomato" height="80px"></Box>
                </SimpleGrid>
            </Box>
        </>
    );
};

export { VideoSection };
