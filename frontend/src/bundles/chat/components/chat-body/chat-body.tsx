import { Box } from '~/bundles/common/components/components.js';

import { type Message } from '../../types/types.js';
import { MessageList } from '../message-list/message-list.js';

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
