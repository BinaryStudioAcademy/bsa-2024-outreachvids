import { type Message } from '~/bundles/chat/libs/types/types.js';

type OpenAIService = {
    generateText(messages: Message[]): Promise<string>;
};

export { type OpenAIService };
