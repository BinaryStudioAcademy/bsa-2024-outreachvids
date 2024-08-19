import { Flex } from '@chakra-ui/react';

import { Loader } from '../components.js';

const LoaderOverlay = (): JSX.Element => {
    return (
        <Flex
            width="full"
            height="calc(100vh)"
            position="absolute"
            background="shadow.700"
            color="white"
            justifyContent="center"
            alignItems="center"
        >
            <Loader />
        </Flex>
    );
};

export { LoaderOverlay };
