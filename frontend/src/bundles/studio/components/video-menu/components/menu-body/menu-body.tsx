import {
    Box,
    CloseButton,
    Flex,
    Heading,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

type Properties = {
    title: string | React.ReactNode;
    onClose: () => void;
    onChatOpen?: () => void;
    menuBodyReference: React.RefObject<HTMLDivElement>;
};

const MenuBody: React.FC<React.PropsWithChildren<Properties>> = ({
    title,
    children,
    onClose,
    onChatOpen,
    menuBodyReference,
}) => {
    return (
        <Box
            ref={menuBodyReference}
            bg="background.900"
            className={styles['menu-body']}
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                marginBottom="30px"
            >
                <Heading variant="H3">{title}</Heading>
                <Flex align="center">
                    {title === 'Script' && (
                        <IconButton
                            aria-label="OpenAI icon button"
                            icon={<Icon as={IconName.OPEN_AI} boxSize={6} />}
                            variant="icon"
                            onClick={onChatOpen}
                        />
                    )}

                    <CloseButton onClick={onClose} color="background.600" />
                </Flex>
            </Flex>
            <Box className={styles['menu-body-content']}>{children}</Box>
        </Box>
    );
};

export { MenuBody };
