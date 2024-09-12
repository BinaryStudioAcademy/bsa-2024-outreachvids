import { MessageSender } from '~/bundles/chat/enums/enums.js';
import { type Message } from '~/bundles/chat/types/types.js';
import { Box, Flex, Text } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    message: Message;
};

const MessageBox: React.FC<Properties> = ({ message }) => {
    const { sender, text } = message;

    return (
        <Box
            className={`${styles['message-box__container']} ${styles[sender === MessageSender.USER ? 'message-box__container--user' : 'message-box__container--ai']}`}
        >
            <Flex
                className={`${styles['message-box']} ${styles[sender === MessageSender.USER ? 'message-box--user' : 'message-box--ai']}`}
            >
                <Text color="black" bg="background.50" p={3} borderRadius="md">
                    {text}
                </Text>
            </Flex>
        </Box>
    );
};

export { MessageBox };
