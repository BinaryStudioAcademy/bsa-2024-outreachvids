import { Box } from '~/bundles/common/components/components.js';

import { type GenerateTextRequestDto } from '../../types/types.js';
import { ChatForm } from '../chat-form/chat-form.js';

type Properties = {
    onSendMessage: (payload: GenerateTextRequestDto) => void;
};

const ChatFooter: React.FC<Properties> = ({ onSendMessage }) => {
    return (
        <Box>
            <ChatForm onSubmit={onSendMessage} />
        </Box>
    );
};

export { ChatFooter };