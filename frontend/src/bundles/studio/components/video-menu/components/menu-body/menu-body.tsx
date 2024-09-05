import {
    Box,
    CloseButton,
    Flex,
    Heading,
} from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    title: string | React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const MenuBody: React.FC<Properties> = ({
    title,
    children,
    isOpen,
    onClose,
}) => {
    return (
        <>
            {isOpen && (
                <Box bg="background.900" className={styles['menu-body']}>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom="30px"
                    >
                        <Heading variant="H3">{title}</Heading>
                        <CloseButton onClick={onClose} color="background.600" />
                    </Flex>
                    <Box className={styles['menu-body-content']}>
                        {children}
                    </Box>
                </Box>
            )}
        </>
    );
};

export { MenuBody };
