import { Box, Button, Flex } from '~/bundles/common/components/components.js';

import { Circles } from '../components/circles/circles.js';
import { Dots } from '../components/dots/dots.js';

const CreateAvatar = (): JSX.Element => {
    return (
        <Flex
            bg="white"
            h="215px"
            borderRadius="8px"
            justify="center"
            align="center"
            overflow="hidden"
        >
            <Box w="222px" position="relative">
                <Circles />
                <Dots />
                <Button label="Create Avatar" />
            </Box>
        </Flex>
    );
};

export { CreateAvatar };
