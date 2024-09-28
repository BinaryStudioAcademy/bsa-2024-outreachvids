import { Chat } from '~/bundles/chat/components/components.js';
import { useChatCleanup } from '~/bundles/chat/hooks/hooks.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { type GenerateTextRequestDto } from '~/bundles/chat/types/types.js';
import {
    LibraryModal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

type Properties = {
    isChatOpen: boolean;
    onModalChatClose: () => void;
    modalReference: React.RefObject<HTMLDivElement>;
};

const ChatModal: React.FC<Properties> = ({
    isChatOpen,
    onModalChatClose,
    modalReference,
}) => {
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

    const { handleCloseChat } = useChatCleanup({ onModalChatClose });

    return (
        <LibraryModal
            closeOnOverlayClick={false}
            isOpen={isChatOpen}
            onClose={handleCloseChat}
            size="5xl"
        >
            <ModalOverlay />
            <ModalContent borderRadius="xl" ref={modalReference}>
                <ModalCloseButton color="white" />
                <Chat
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    headerTitle="AI assistant"
                    headerComment="Your secret to crafting compelling scripts effortlessly!"
                />
            </ModalContent>
        </LibraryModal>
    );
};

export { ChatModal };
