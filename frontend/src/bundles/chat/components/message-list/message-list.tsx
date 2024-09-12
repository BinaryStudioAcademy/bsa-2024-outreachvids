import { MessageBox } from '~/bundles/chat/components/message-box/message-box.js';
import { MessageSender } from '~/bundles/chat/enums/enums.js';
import { type Message, type MessageGroup } from '~/bundles/chat/types/types.js';
import { Flex, VStack } from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { UserAvatar } from '~/bundles/users/components/components.js';

import styles from './styles.module.css';

type Properties = {
    messages: Message[];
};

const MessageList: React.FC<Properties> = ({ messages }) => {
    const user = useAppSelector(({ auth }) => auth.user);
    const groupedMessages = useMemo(() => {
        const groupedMessages: MessageGroup[] = [];
        let currentGroup: MessageGroup | null = null;

        for (const message of messages) {
            const { sender } = message;
            if (!currentGroup || currentGroup.sender !== sender) {
                currentGroup = { sender, messages: [message] };
                groupedMessages.push(currentGroup);
            } else {
                currentGroup.messages.push(message);
            }
        }

        return groupedMessages;
    }, [messages]);

    return (
        <VStack spacing={4} align="stretch" p={4} h="400px" overflowY="auto">
            {groupedMessages.map(
                ({ sender, messages }: MessageGroup, groupIndex: number) => {
                    return (
                        <Flex
                            key={groupIndex}
                            className={`${styles['message-list']} ${styles[sender === MessageSender.USER ? 'message-list--user' : 'message-list--ai']}`}
                        >
                            <UserAvatar
                                username={
                                    sender === MessageSender.USER
                                        ? user?.fullName
                                        : 'Artificial Intelligence'
                                }
                            />
                            <VStack
                                spacing={2}
                                className={`${styles['message-group-list']} ${styles[sender === MessageSender.USER ? 'message-group-list--user' : 'message-group-list--ai']}`}
                            >
                                {messages.map(
                                    (message: Message, index: number) => (
                                        <MessageBox
                                            key={index}
                                            message={message}
                                        />
                                    ),
                                )}
                            </VStack>
                        </Flex>
                    );
                },
            )}
        </VStack>
    );
};

export { MessageList };
