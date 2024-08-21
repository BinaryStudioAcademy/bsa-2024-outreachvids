import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';

import { VideoModalContent } from './components/components.js';

type Properties = {
    isOpen: boolean;
    onModalClose: () => void;
};

const VideoModal = ({ isOpen, onModalClose }: Properties): JSX.Element => {
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
                <ModalHeader
                    backgroundColor="gray.100"
                    width="290px"
                    padding="33px 44px 0px"
                >
                    Create video
                </ModalHeader>
                <ModalCloseButton margin="20px" />
                <ModalBody padding="0px">
                    <VideoModalContent />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export { VideoModal };
