import { type ValueOf } from 'shared';
import { type Tiktoken, encoding_for_model } from 'tiktoken';

import { type OpenAIRole } from './libs/enums/open-ai-role.enum.js';
import {
    type ChatService as ChatServiceT,
    type Message,
} from './libs/types/types.js';

class ChatService implements ChatServiceT {
    private modelEncoding: Tiktoken;

    public constructor() {
        this.modelEncoding = encoding_for_model('gpt-4o-mini');
    }

    public addMessageToHistory(
        chatHistory: Message[],
        userMessage: string,
        role: ValueOf<typeof OpenAIRole>,
    ): void {
        const newUserMessage = {
            content: userMessage,
            role,
        };

        chatHistory.push(newUserMessage);
    }

    public clearChatHistory(messages: Message[]): void {
        messages.splice(0, messages.length);
    }

    private countTokens(messages: Message[]): number {
        return messages.reduce(
            (sum, message) =>
                sum + this.modelEncoding.encode(message.content).length,
            0,
        );
    }

    public deleteOldMessages(messages: Message[], maxTokens: number): void {
        let totalTokens = this.countTokens(messages);

        while (totalTokens > maxTokens) {
            const removedMessage = messages[0];

            if (!removedMessage) {
                break;
            }

            messages.splice(0, 1);

            totalTokens -= this.modelEncoding.encode(
                removedMessage.content,
            ).length;
        }
    }
}

export { ChatService };
