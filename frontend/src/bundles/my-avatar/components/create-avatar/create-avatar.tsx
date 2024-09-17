import { Box, Button, Flex } from '~/bundles/common/components/components.js';

import { Circles, Dots } from '../components.js';

const CreateAvatar = (): JSX.Element => {
    return (
        <Flex
            bg="white"
            h="215px"
            borderRadius="lg"
            justify="center"
            align="center"
            overflow="hidden"
        >
            <Box w={{ base: '122px', sm: '222px' }} position="relative">
                <Circles />
                <Dots />
                <Button label="Create Avatar" />
            </Box>
        </Flex>
    );
};

export { CreateAvatar };
