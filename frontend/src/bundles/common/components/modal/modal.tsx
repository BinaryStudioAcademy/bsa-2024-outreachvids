import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { type ReactNode } from 'react';

type Properties = {
    isOpen: boolean;
    closeModal: () => void;
    title?: string;
    children: ReactNode;
};

const Modal = ({
    isOpen,
    closeModal,
    title,
    children,
}: Properties): JSX.Element => {
    return (
        <ChakraModal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </ChakraModal>
    );
};

export { Modal };
