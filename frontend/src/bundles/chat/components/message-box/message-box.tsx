import { Box, Flex, Text } from '~/bundles/common/components/components.js';

import { type Message } from '../../types/types.js';

type Properties = {
    message: Message;
};

const MessageBox: React.FC<Properties> = ({ message }) => {
    const { sender, text } = message;

    return (
        <Box
            alignSelf={sender === 'user' ? 'flex-start' : 'flex-end'}
            width="100%"
        >
            <Flex
                ml={sender === 'user' ? 0 : 3}
                mr={sender === 'user' ? 3 : 0}
                direction={'column'}
                alignItems={sender === 'user' ? 'flex-end' : 'flex-start'}
            >
                {/* <Text fontSize="sm" color="gray.500" mt={2}>
                    {timeStamp.toLocaleString()}
                </Text> */}
                <Text
                    color={'black'}
                    bg={'background.50'}
                    p={3}
                    borderRadius="md"
                    width={'max'}
                >
                    {text}
                </Text>
            </Flex>
        </Box>
    );
};

export { MessageBox };
