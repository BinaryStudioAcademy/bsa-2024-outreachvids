import {
    Box,
    Header,
    Sidebar,
    Text,
} from '~/bundles/common/components/components.js';

import { CreateAvatar } from '../components/components.js';

const MyAvatar = (): JSX.Element => {
    return (
        <>
            <Header />
            <Sidebar>
                <Box bg="background.900" pr="20px">
                    <Box
                        bg="background.50"
                        height="100vh"
                        p="20px"
                        borderRadius="xl"
                    >
                        <Text variant="title">My Avatar</Text>
                        <CreateAvatar />
                    </Box>
                </Box>
            </Sidebar>
        </>
    );
};

export { MyAvatar };
