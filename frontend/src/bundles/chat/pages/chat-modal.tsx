import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import { Chat } from '../components/components.js';
import { actions as chatActions } from '../store/chat.js';
import { type GenerateTextRequestDto } from '../types/types.js';

type Properties = {
    isChatOpen: boolean;
    onModalChatClose: () => void;
};

const ChatModal: React.FC<Properties> = ({ isChatOpen, onModalChatClose }) => {
    const dispatch = useAppDispatch();
    const { messages } = useAppSelector(({ chat }) => ({
        messages: chat.messages,
    }));

    const handleSendMessage = useCallback(
        (payload: GenerateTextRequestDto) => {
            void dispatch(chatActions.sendMessage(payload));
        },
        [dispatch],
    );

    const handleCloseChat = useCallback(() => {
        onModalChatClose();
        void dispatch(chatActions.deleteChat());
    }, [dispatch, onModalChatClose]);

    return (
        <>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isChatOpen}
                onClose={handleCloseChat}
                size={'5xl'}
            >
                <ModalOverlay />
                <ModalContent borderRadius={'xl'}>
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
