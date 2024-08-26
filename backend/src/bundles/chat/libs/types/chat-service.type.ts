import { type ValueOf } from 'shared';

import { type OpenAIRole } from '../enums/enums.js';
import { type Message } from './message.type.js';

type ChatService = {
    addMessageToHistory(
        chatHistory: Message[],
        userMessage: string,
        role: ValueOf<typeof OpenAIRole>,
    ): void;
    clearChatHistory(messages: Message[]): void;
    deleteOldMessages(messages: Message[], maxTokens: number): void;
};

export { type ChatService };
