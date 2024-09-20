import { Fade, Flex } from '@chakra-ui/react';

import styles from './styles.module.css';

type Properties = {
    isOpen: boolean;
    children: React.ReactNode;
};

const Overlay: React.FC<Properties> = ({ isOpen, children }) => {
    return (
        <Fade in={isOpen} hidden={!isOpen} className={styles['overlay']}>
            <Flex
                background="background.600"
                color="white"
                justifyContent="center"
                alignItems="center"
                width="100vw"
                height="100vh"
            >
                {children}
            </Flex>
        </Fade>
    );
};

export { Overlay };
