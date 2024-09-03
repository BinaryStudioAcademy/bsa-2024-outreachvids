import { Flex, VStack } from '~/bundles/common/components/components.js';
import { UserAvatar } from '~/bundles/users/components/components.js';

import { MessageSender } from '../../enums/enums.js';
import { type Message, type MessageGroup } from '../../types/types.js';
import { MessageBox } from '../message-box/message-box.js';

type Properties = {
    messages: Message[];
};

const MessageList: React.FC<Properties> = ({ messages }) => {
    const groupedMessages: MessageGroup[] = [];
    let currentGroup: MessageGroup | null = null;

    for (const message of messages) {
        const { sender } = message;
        if (!currentGroup || currentGroup.sender !== sender) {
            currentGroup = { sender: sender, messages: [message] };
            groupedMessages.push(currentGroup);
        } else {
            currentGroup.messages.push(message);
        }
    }

    return (
        <VStack spacing={4} align="stretch" p={4} h="400px" overflowY="auto">
            {groupedMessages.map((group: MessageGroup, groupIndex: number) => {
                const { sender, messages } = group;
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
                            {messages.map((message: Message) => (
                                <MessageBox
                                    key={message.id}
                                    message={message}
                                />
                            ))}
                        </VStack>
                    </Flex>
                );
            })}
        </VStack>
    );
};

export { MessageList };
