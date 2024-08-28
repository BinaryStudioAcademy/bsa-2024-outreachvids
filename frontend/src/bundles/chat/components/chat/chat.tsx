import { Box } from '~/bundles/common/components/components.js';

import { type ChatRequestDto, type Message } from '../../types/types.js';
import { ChatBody } from '../chat-body/chat-body.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { ChatHeader } from '../chat-header/chat-header.js';

type Properties = {
    messages: Message[];
    onSendMessage: (payload: ChatRequestDto) => void;
    headerTitle: string;
    headerComment: string;
};

const Chat: React.FC<Properties> = ({
    messages,
    onSendMessage,
    headerTitle,
    headerComment,
}) => {
    return (
        <Box>
            <ChatHeader title={headerTitle} comment={headerComment} />
            <Box sx={{ p: '10' }}>
                <ChatBody messages={messages} />
                <ChatFooter onSendMessage={onSendMessage} />
            </Box>
        </Box>
    );
};

export { Chat };
