import {
    LibraryModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';
import { type ModalProps } from '~/bundles/common/types/types.js';

import styles from './styles.module.css';

type Properties = {
    modalReference?: React.RefObject<HTMLElement>;
} & ModalProps;
const Modal: React.FC<Properties> = ({
    children,
    modalReference,
    ...properties
}) => {
    return (
        <LibraryModal {...properties} isCentered>
            <ModalOverlay />
            <ModalContent
                className={styles['modal-content']}
                ref={modalReference}
            >
                <ModalCloseButton margin="20px" zIndex={10} />
                <ModalBody padding={0}>{children}</ModalBody>
            </ModalContent>
        </LibraryModal>
    );
};

export { Modal };
