import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

type Properties = {
    onModalChatClose: () => void;
};

type ReturnValue = {
    handleCloseChat: () => void;
};

const useChatCleanup = ({ onModalChatClose }: Properties): ReturnValue => {
    const dispatch = useAppDispatch();

    const handleDeleteChat = useCallback(() => {
        void dispatch(chatActions.deleteChat());
    }, [dispatch]);

    const handleCloseChat = useCallback(() => {
        onModalChatClose();
        handleDeleteChat();
    }, [handleDeleteChat, onModalChatClose]);

    useEffect(() => {
        window.addEventListener('beforeunload', handleDeleteChat);

        return () => {
            window.removeEventListener('beforeunload', handleDeleteChat);
        };
    }, [handleDeleteChat]);

    return { handleCloseChat };
};

export { useChatCleanup };
