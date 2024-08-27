import { type ValueOf } from 'shared';
import { type Tiktoken, encoding_for_model } from 'tiktoken';

import { CHAT_MODEL } from '~/common/services/open-ai/libs/constants/constants.js';
import { type OpenAIRole } from '~/common/services/open-ai/libs/enums/enums.js';

import {
    type ChatService as ChatServiceT,
    type Message,
} from './libs/types/types.js';

class ChatService implements ChatServiceT {
    private modelEncoding: Tiktoken;

    public constructor() {
        this.modelEncoding = encoding_for_model(CHAT_MODEL);
    }

    public addMessageToHistory(
        chatHistory: Message[],
        userMessage: string,
        role: ValueOf<typeof OpenAIRole>,
    ): Message[] {
        const newUserMessage = {
            content: userMessage,
            role,
        };

        return [...chatHistory, newUserMessage];
    }

    private countTokens(messages: Message[]): number {
        return messages.reduce(
            (sum, message) =>
                sum + this.modelEncoding.encode(message.content).length,
            0,
        );
    }

    public deleteOldMessages(
        messages: Message[],
        maxTokens: number,
    ): Message[] {
        let totalTokens = this.countTokens(messages);
        let updatedMessages = [...messages];

        while (totalTokens > maxTokens && updatedMessages.length > 0) {
            const [removedMessage, ...rest] = updatedMessages;
            updatedMessages = rest;

            if (!removedMessage) {
                break;
            }

            totalTokens -= this.modelEncoding.encode(
                removedMessage.content,
            ).length;
        }

        return updatedMessages;
    }
}

export { ChatService };
