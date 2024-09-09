import {
    Box,
    CloseButton,
    Flex,
    Heading,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    title: string | React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onChatOpen?: () => void;
};

const MenuBody: React.FC<Properties> = ({
    title,
    children,
    isOpen,
    onClose,
    onChatOpen,
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
                        <Flex align="center">
                            {title === 'Script' ? (
                                <IconButton
                                    aria-label="AI icon button"
                                    icon={<Icon />}
                                    variant="icon"
                                    boxSize={5}
                                    onClick={onChatOpen}
                                />
                            ) : null}

                            <CloseButton
                                onClick={onClose}
                                color="background.600"
                            />
                        </Flex>
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
