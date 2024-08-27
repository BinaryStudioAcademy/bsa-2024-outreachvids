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

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { type ChatFormRequestDto, type Message } from '../../types/types.js';
import { ChatBody } from '../chat-body/chat-body.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { ChatHeader } from '../chat-header/chat-header.js';

const Chat: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = useCallback(
        (payload: ChatFormRequestDto) => {
            const userMessage: Message = {
                id: messages.length + 1,
                sender: 'user',
                text: payload.message,
            };

            setMessages((previousMessages) => [
                ...previousMessages,
                userMessage,
            ]);

            setTimeout(() => {
                const aiMessage: Message = {
                    id: messages.length + 2,
                    sender: 'ai',
                    text: `AI response to "${payload.message}"`,
                };
                setMessages((previousMessages) => [
                    ...previousMessages,
                    aiMessage,
                ]);
            }, 1000);
        },
        [messages, setMessages],
    );

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader p={0}>
                        <ChatHeader
                            title="GPT4 Script Writter"
                            comment="Your secret to crafting compelling scripts effortilessy!"
                        />
                    </ModalHeader>

                    <ModalCloseButton color="white" />

                    <ModalBody>
                        <ChatBody messages={messages} />
                    </ModalBody>

                    <ModalFooter>
                        <ChatFooter onSendMessage={handleSendMessage} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { Chat };
