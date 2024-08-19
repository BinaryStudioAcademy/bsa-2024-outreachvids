import { Flex, Text } from '@chakra-ui/react';

const Header = (): JSX.Element => {
    return (
        <Flex
            as="header"
            height="75px"
            position="sticky"
            top="0"
            left="0"
            width="100%"
            backgroundColor="background.900"
            color="white"
            boxShadow="md"
            zIndex="1000"
            padding="4"
            marginBottom="20px"
        >
            <Flex
                width="full"
                alignItems="center"
                maxWidth="1440px"
                margin="0 auto"
            >
                <Text fontSize="xl" fontWeight="bold">
                    Logo
                </Text>
            </Flex>
        </Flex>
    );
};

export { Header };
