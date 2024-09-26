import { Box, Text } from '~/bundles/common/components/components.js';

import { AvatarsLibrary } from '../components.js';

const Avatars: React.FC = () => {
    return (
        <Box bg="background.900" pr="25px">
            <Box
                bg="background.50"
                borderTopRadius="xl"
                p="25px"
                minH="calc(100vh - 75px)"
            >
                <Text variant="title">AI Avatars</Text>
                <AvatarsLibrary />
            </Box>
        </Box>
    );
};

export { Avatars };
