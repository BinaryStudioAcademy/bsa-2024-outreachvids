import {
    Box,
    CloseButton,
    Flex,
    Heading,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import { DOM_EVENT } from '~/bundles/common/enums/enums.js';
import { useEffect, useRef } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

type Properties = {
    title: string | React.ReactNode;
    onClose: () => void;
    onChatOpen?: () => void;
};

const MenuBody: React.FC<React.PropsWithChildren<Properties>> = ({
    title,
    children,
    onClose,
    onChatOpen,
}) => {
    const menuReference = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                menuReference.current &&
                !menuReference.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener(DOM_EVENT.MOUSE_DOWN, handleClickOutside);

        return () => {
            document.removeEventListener(
                DOM_EVENT.MOUSE_DOWN,
                handleClickOutside,
            );
        };
    }, [onClose]);

    return (
        <Box
            ref={menuReference}
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
