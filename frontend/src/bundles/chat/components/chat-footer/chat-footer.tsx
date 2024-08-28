import { type ChatRequestDto } from '../../types/types.js';
import { ChatForm } from '../chat-form/chat-form.js';

type Properties = {
    onSendMessage: (payload: ChatRequestDto) => void;
};

const ChatFooter: React.FC<Properties> = ({ onSendMessage }) => {
    return (
        <>
            <ChatForm onSubmit={onSendMessage} />
        </>
    );
};

export { ChatFooter };
