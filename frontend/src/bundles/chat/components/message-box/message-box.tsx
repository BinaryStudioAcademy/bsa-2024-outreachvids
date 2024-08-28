import { Box, Flex, Text } from '~/bundles/common/components/components.js';

import { MessageSender } from '../../enums/enums.js';
import { type Message } from '../../types/types.js';

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
                ml={sender === MessageSender.USER ? 0 : 3}
                mr={sender === MessageSender.USER ? 3 : 0}
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
                    width={'max'}
                >
                    {text}
                </Text>
            </Flex>
        </Box>
    );
};

export { MessageBox };
