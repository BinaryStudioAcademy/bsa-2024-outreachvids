import { Box, Header, Text } from '~/bundles/common/components/components.js';

import { CreateAvatar } from '../components/components.js';

const MyAvatar = (): JSX.Element => {
    return (
        <Box bg="background.900" p="0 25px">
            <Header />
            {/* Sidebar */}
            <Box bg="background.50" height="100vh" p="25px" borderRadius="xl">
                <Text variant="title">My Avatar</Text>
                <CreateAvatar />
            </Box>
        </Box>
    );
};

export { MyAvatar };
