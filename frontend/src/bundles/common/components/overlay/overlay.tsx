import { Fade, Flex } from '@chakra-ui/react';

import styles from './overlay.module.css';

type Properties = {
    isOpen: boolean;
    children: React.ReactNode;
};

const Overlay = ({ isOpen, children }: Properties): JSX.Element => {
    return (
        <Fade in={isOpen}>
            <Flex className={styles['overlay']}>
                {children}
            </Flex>
        </Fade>
    );
};

export { Overlay };
