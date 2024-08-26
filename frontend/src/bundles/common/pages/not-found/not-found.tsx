import {
    Box,
    Center,
    Heading,
} from '~/bundles/common/components/components.js';

import { Animated404 } from './animated404.js';

const NotFound: React.FC = () => {
    return (
        <Center height="100vh" bg="background.900">
            <Box textAlign="center">
                <Animated404 />
                <Heading variant="H3" mt={4} as="span">
                    Page not found
                </Heading>
            </Box>
        </Center>
    );
};

export { NotFound };
