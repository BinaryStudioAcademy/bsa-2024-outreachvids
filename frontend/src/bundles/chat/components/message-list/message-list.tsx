import { VStack } from '~/bundles/common/components/components.js';

import { type Message } from '../../types/types.js';
import { MessageBox } from '../message-box/message-box.js';

type Properties = {
    messages: Message[];
};

const MessageList: React.FC<Properties> = ({ messages }) => {
    return (
        <VStack
            spacing={4}
            align="stretch"
            p={4}
            borderWidth={1}
            borderRadius="md"
            h="400px"
            overflowY="auto"
        >
            {messages.map((message) => (
                <MessageBox key={message.id} message={message} />
            ))}
        </VStack>
    );
};

export { MessageList };
