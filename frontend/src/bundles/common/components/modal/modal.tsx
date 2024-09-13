import { type ModalProps } from '@chakra-ui/react';

import {
    BaseModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

const Modal: React.FC<ModalProps> = (properties) => {
    return (
        <BaseModal {...properties} isCentered>
            <ModalOverlay />
            <ModalContent className={styles['modal-content']}>
                <ModalCloseButton margin="20px" zIndex={10} />
                <ModalBody padding={0}>{properties.children}</ModalBody>
            </ModalContent>
        </BaseModal>
    );
};

export { Modal };
