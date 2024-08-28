import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { Chat } from '../components/components.js';
import { type ChatRequestDto, type Message } from '../types/types.js';

const ChatModal: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = useCallback(
        (payload: ChatRequestDto) => {
            const userMessage: Message = {
                id: messages.length + 1,
                sender: 'user',
                text: payload.message,
                timeStamp: new Date(),
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
                    timeStamp: new Date(),
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
                size={'5xl'}
            >
                <ModalOverlay />
                <ModalContent
                    borderTopLeftRadius={'xl'}
                    borderTopRightRadius={'xl'}
                    borderBottomLeftRadius={'xl'}
                    borderBottomRightRadius={'xl'}
                >
                    <ModalCloseButton color="white" />
                    <Chat
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        headerTitle="GPT4 Script Writer"
                        headerComment="Your secret to crafting compelling scripts effortlessly!"
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

export { ChatModal };
