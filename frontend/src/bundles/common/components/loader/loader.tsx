import {
    Box,
    Circle,
    Flex,
    Logo,
    Text,
} from '~/bundles/common/components/components.js';

import { SPIN_ANIMATION } from './libs/constants/constants.js';

const Loader = (): JSX.Element => {
    return (
        <Flex flexDirection="column" alignItems="center">
            <Box position="relative" width="100px" height="100px">
                <Circle size="full" color="text.default">
                    <Logo logoSize='70px'/>
                </Circle>
                <Circle
                    position="absolute"
                    inset="0"
                    borderWidth="5px"
                    borderColor="shadow.200"
                    borderTopColor="brand.secondary.300"
                    animation={`${SPIN_ANIMATION} 1s linear infinite`}
                />
            </Box>
            <Text fontSize="lg" marginTop="10px">
                Loading...
            </Text>
        </Flex>
    );
};

export { Loader };
