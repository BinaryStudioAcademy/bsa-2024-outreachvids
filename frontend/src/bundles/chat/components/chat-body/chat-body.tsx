import { MessageList } from '~/bundles/chat/components/message-list/message-list.js';
import { type Message } from '~/bundles/chat/types/types.js';
import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    messages: Message[];
};

const ChatBody: React.FC<Properties> = ({ messages }) => {
    return (
        <Box sx={{ minH: '400px', maxH: '400px', overflowY: 'auto', mb: '2' }}>
            <MessageList messages={messages} />
        </Box>
    );
};

export { ChatBody };
