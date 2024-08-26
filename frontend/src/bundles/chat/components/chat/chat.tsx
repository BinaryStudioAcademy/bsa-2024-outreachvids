import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import { ChatBody } from '../chat-body/chat-body.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { ChatHeader } from '../chat-header/chat-header.js';

const Chat: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <ChatHeader />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <ChatBody />
                    </ModalBody>

                    <ModalFooter>
                        <ChatFooter />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { Chat };
