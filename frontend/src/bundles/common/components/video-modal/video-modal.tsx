import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react';

import { VideoModalContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onModalClose: () => void;
};

const VideoModal: React.FC<Properties> = ({ isOpen, onModalClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onModalClose} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius="17px"
                maxWidth="90%"
                maxHeight="90%"
                height="full"
                overflow="auto"
            >
                <ModalCloseButton margin="20px" zIndex={10} />
                <ModalBody padding={0}>
                    <VideoModalContent />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export { VideoModal };
