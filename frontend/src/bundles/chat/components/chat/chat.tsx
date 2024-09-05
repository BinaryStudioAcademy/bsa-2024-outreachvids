import { ChatBody } from '~/bundles/chat/components/chat-body/chat-body.js';
import { ChatFooter } from '~/bundles/chat/components/chat-footer/chat-footer.js';
import { ChatHeader } from '~/bundles/chat/components/chat-header/chat-header.js';
import {
    type GenerateTextRequestDto,
    type Message,
} from '~/bundles/chat/types/types.js';
import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    messages: Message[];
    onSendMessage: (payload: GenerateTextRequestDto) => void;
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
