import { type Message } from './message.type.js';

type OpenAIService = {
    generateText(messages: Message[]): Promise<string>;
};

export { type OpenAIService };
