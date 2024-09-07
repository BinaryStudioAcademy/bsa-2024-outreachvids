import { Box, Flex, Text } from '@chakra-ui/react';

import styles from './header.module.css';

type Properties = {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
};

const Header: React.FC<Properties> = ({ left, center, right }) => {
    return (
        <Flex as="header" className={styles['header']}>
            {left ?? (
                // {/* TODO: Add logo */}
                <Text className={styles['logoText']}>Logo</Text>
            )}
            <Box>{center}</Box>
            <Box>{right}</Box>
        </Flex>
    );
};

export { Header };
