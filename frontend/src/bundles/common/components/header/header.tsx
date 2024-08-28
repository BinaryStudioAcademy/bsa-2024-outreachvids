import { Box, Flex, Text } from '@chakra-ui/react';

type Properties = {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
};

const Header: React.FC<Properties> = ({ left, center, right }) => {
    return (
        <Flex
            as="header"
            height="75px"
            position="sticky"
            top="0"
            left="0"
            width="full"
            backgroundColor="background.900"
            boxShadow="md"
            zIndex="1000"
            padding="4"
            alignItems="center"
            justifyContent="space-between"
        >
            {left ?? (
                // {/* TODO: Add logo */}
                <Text fontSize="xl" fontWeight="lighter" color="white">
                    Logo
                </Text>
            )}
            <Box>{center}</Box>
            <Box>{right}</Box>
        </Flex>
    );
};

export { Header };
