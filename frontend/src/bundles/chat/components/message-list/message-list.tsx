import { MessageBox } from '~/bundles/chat/components/message-box/message-box.js';
import { MessageSender } from '~/bundles/chat/enums/enums.js';
import { type Message, type MessageGroup } from '~/bundles/chat/types/types.js';
import { Flex, VStack } from '~/bundles/common/components/components.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { UserAvatar } from '~/bundles/users/components/components.js';

type Properties = {
    messages: Message[];
};

const MessageList: React.FC<Properties> = ({ messages }) => {
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
                            direction={
                                sender === MessageSender.USER
                                    ? 'row-reverse'
                                    : 'row'
                            }
                            alignItems="flex-start"
                        >
                            <UserAvatar
                                username={
                                    sender === MessageSender.USER ? 'FL' : 'AI'
                                }
                            />
                            <VStack
                                spacing={2}
                                align={
                                    sender === MessageSender.USER
                                        ? 'flex-end'
                                        : 'flex-start'
                                }
                                width={'max'}
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
