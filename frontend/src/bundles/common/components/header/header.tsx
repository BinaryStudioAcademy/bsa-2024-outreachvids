import { Box, Flex } from '@chakra-ui/react';

import logo from '~/assets/img/logo.svg';
import logoTxt from '~/assets/img/logo-text.svg';
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
                <Link to={AppRoute.ROOT}>
                    <Box className={styles['logo-container']}>
                        <img src={logo} alt="Logo" className={styles['logo']} />
                        <img src={logoTxt} alt="Logo text" />
                    </Box>
                </Link>
            )}
            <Box>{center}</Box>
            <Box>{right}</Box>
        </Flex>
    );
};

export { Header };
