import { type GeneratedText } from './generated-text.type.js';
import { type Message } from './message.type.js';

type OpenAIService = {
    generateText(messages: Message[]): Promise<GeneratedText>;
};

export { type OpenAIService };
