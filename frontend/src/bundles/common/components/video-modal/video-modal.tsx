import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react';

import { useChatCleanup } from '~/bundles/chat/hooks/hooks.js';

import { VideoModalContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onModalClose: () => void;
};

const VideoModal: React.FC<Properties> = ({ isOpen, onModalClose }) => {
    const { handleCloseChat } = useChatCleanup({
        onModalChatClose: onModalClose,
    });

    return (
        <Modal isOpen={isOpen} onClose={handleCloseChat} isCentered>
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
