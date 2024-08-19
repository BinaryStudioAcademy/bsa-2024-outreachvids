import { Box, Circle, Flex, keyframes, Text } from '@chakra-ui/react';

const spin = keyframes`
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg)}
`;

const Loader = (): JSX.Element => {
    return (
        <Flex flexDirection="column" alignItems="center">
            <Box position="relative" width="100px" height="100px">
                <Circle
                    size="full"
                    backgroundColor="white"
                    color="text.default"
                >
                    LOGO
                </Circle>
                <Circle
                    position="absolute"
                    inset="0"
                    borderWidth="5px"
                    borderColor="shadow.200"
                    borderTopColor="brand.secondary.300"
                    animation={`${spin} 1s linear infinite`}
                ></Circle>
            </Box>
            <Text fontSize="lg" marginTop="10px">
                Loading...
            </Text>
        </Flex>
    );
};

export { Loader };
