import { Box, Flex, Text } from '@chakra-ui/react';

import { AppRoute } from '~/bundles/common/enums/enums.js';

import { Link } from '../link/link.js';
import styles from './styles.module.css';

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
                <Link to={AppRoute.ROOT}>
                    <Text className={styles['logoText']}>Logo</Text>
                </Link>
            )}
            <Box>{center}</Box>
            <Box>{right}</Box>
        </Flex>
    );
};

export { Header };
