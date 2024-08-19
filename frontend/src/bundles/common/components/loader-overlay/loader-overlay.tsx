import { Fade, Flex } from '@chakra-ui/react';

import { Loader } from '../loader/loader.js';

const LoaderOverlay = (): JSX.Element => {
    return (
        <Fade in={true}>
            <Flex
                width="full"
                height="full"
                position="absolute"
                background="shadow.700"
                color="white"
                justifyContent="center"
                alignItems="center"
            >
                <Loader />
            </Flex>
        </Fade>
    );
};

export { LoaderOverlay };
