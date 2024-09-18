import { Box, Flex } from '@chakra-ui/react';

import { Logo } from '~/bundles/common/components/components.js';
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
                <Box className={styles['left']}>
                    <Link to={AppRoute.ROOT}>
                        <Logo textSize="150px" logoSize="40px" />
                    </Link>
                </Box>
            )}
            <Box className={styles['center']}>{center}</Box>
            <Box className={styles['right']}>{right}</Box>
        </Flex>
    );
};

export { Header };
