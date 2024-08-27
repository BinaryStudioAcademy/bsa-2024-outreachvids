import { type ChatFormRequestDto } from '../../types/types.js';
import { ChatForm } from '../chat-form/chat-form.js';

type Properties = {
    onSendMessage: (payload: ChatFormRequestDto) => void;
};

const ChatFooter: React.FC<Properties> = ({ onSendMessage }) => {
    return (
        <>
            <ChatForm onSubmit={onSendMessage} />
        </>
    );
};

export { ChatFooter };
