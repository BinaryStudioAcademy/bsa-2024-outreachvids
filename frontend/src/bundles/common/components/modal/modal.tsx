import {
    BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';

import styles from './modal.module.css';

type Properties = {
    isOpen: boolean;
    onModalClose: () => void;
};

const Modal: React.FC<React.PropsWithChildren<Properties>> = ({
    isOpen,
    onModalClose,
    children,
}) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onModalClose} isCentered>
            <ModalOverlay />
            <ModalContent className={styles['modal-content']}>
                <ModalCloseButton margin="20px" zIndex={10} />
                <ModalBody padding={0}>{children}</ModalBody>
            </ModalContent>
        </BaseModal>
    );
};

export { type Properties,Modal };
