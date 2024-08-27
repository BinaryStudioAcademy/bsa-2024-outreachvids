import { Box, Text } from '~/bundles/common/components/components.js';

import { type Message } from '../../types/types.js';

type Properties = {
    message: Message;
};

const MessageBox: React.FC<Properties> = ({ message }) => {
    const { id, sender, text } = message;

    return (
        <Box
            key={id}
            alignSelf={sender === 'user' ? 'flex-end' : 'flex-start'}
            bg={sender === 'user' ? 'blue.100' : 'gray.100'}
            p={3}
            borderRadius="md"
            maxWidth="75%"
        >
            <Text>{text}</Text>
        </Box>
    );
};

export { MessageBox };
