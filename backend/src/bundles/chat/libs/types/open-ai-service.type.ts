import { type ValueOf } from 'shared';

import { type OpenAIRole } from '../enums/enums.js';
import { type Message } from './message.type.js';
import { type SessionChatHistory } from './session-chat-history.js';

type OpenAIService = {
    generateText(messages: Message[]): Promise<string>;
    addMessageToHistory(
        chatHistory: Message[],
        userMessage: string,
        role: ValueOf<typeof OpenAIRole>,
    ): void;
    clearChatHistory(session: SessionChatHistory): void;
};

export { type OpenAIService };
