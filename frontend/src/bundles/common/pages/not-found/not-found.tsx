import {
    Box,
    Center,
    Heading,
    NotFoundAnimation
} from '~/bundles/common/components/components.js';

const NotFound: React.FC = () => {
    return (
        <Center height="100vh" bg="background.900">
            <Box textAlign="center">
                <NotFoundAnimation />
                <Heading variant="H3" mt={4} as="span">
                    Page not found
                </Heading>
            </Box>
        </Center>
    );
};

export { NotFound };
