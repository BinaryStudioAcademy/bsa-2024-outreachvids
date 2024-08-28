import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import { Chat } from '../components/components.js';
import { MessageSender } from '../enums/message-sender.js';
import { actions as chatActions } from '../store/chat.js';
import { type ChatRequestDto, type Message } from '../types/types.js';

const ChatModal: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const { messages } = useAppSelector(({ chat }) => ({
        messages: chat.messages,
    }));

    const handleSendMessage = useCallback(
        (payload: ChatRequestDto) => {
            const userMessage: Message = {
                id: messages.length + 1,
                sender: MessageSender.USER,
                text: payload.message,
                timeStamp: new Date(),
            };

            void dispatch(chatActions.addMessage(userMessage));
            void dispatch(chatActions.sendMessage(payload));
        },
        [dispatch, messages],
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
