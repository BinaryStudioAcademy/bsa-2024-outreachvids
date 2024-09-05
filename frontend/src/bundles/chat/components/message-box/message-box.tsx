import { MessageSender } from '~/bundles/chat/enums/enums.js';
import { type Message } from '~/bundles/chat/types/types.js';
import { Box, Flex, Text } from '~/bundles/common/components/components.js';

type Properties = {
    message: Message;
};

const MessageBox: React.FC<Properties> = ({ message }) => {
    const { sender, text } = message;

    return (
        <Box
            alignSelf={
                sender === MessageSender.USER ? 'flex-start' : 'flex-end'
            }
            width="100%"
        >
            <Flex
                ml={sender === MessageSender.USER ? '50px' : '10px'}
                mr={sender === MessageSender.USER ? '10px' : '50px'}
                direction={'column'}
                alignItems={
                    sender === MessageSender.USER ? 'flex-end' : 'flex-start'
                }
            >
                <Text
                    color={'black'}
                    bg={'background.50'}
                    p={3}
                    borderRadius="md"
                >
                    {text}
                </Text>
            </Flex>
        </Box>
    );
};

export { MessageBox };
