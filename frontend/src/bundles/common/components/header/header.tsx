import { Box, Flex, Text } from '@chakra-ui/react';

import { AppRoute } from '~/bundles/common/enums/enums.js';

import { Link } from '../link/link.js';

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
            zIndex="100"
            padding="4"
            alignItems="center"
            justifyContent="space-between"
        >
            {left ?? (
                // {/* TODO: Add logo */}
                <Link to={AppRoute.ROOT}>
                    <Text fontSize="xl" fontWeight="lighter" color="white">
                        Logo
                    </Text>
                </Link>
            )}
            <Box>{center}</Box>
            <Box>{right}</Box>
        </Flex>
    );
};

export { Header };
