import {
    Box,
    Header,
    Sidebar,
    Text,
} from '~/bundles/common/components/components.js';

import { CreateAvatar } from '../components/components.js';

const MyAvatar = (): JSX.Element => {
    return (
        <Box overflow="hidden">
            <Header />
            <Sidebar>
                <Box bg="background.900" pr="25px">
                    <Box
                        bg="background.50"
                        height="calc(100vh - 75px)"
                        p="25px"
                        borderTopRadius="xl"
                    >
                        <Text variant="title">My Avatar</Text>
                        <CreateAvatar />
                    </Box>
                </Box>
            </Sidebar>
        </Box>
    );
};

export { MyAvatar };
