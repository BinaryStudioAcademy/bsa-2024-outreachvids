import OpenAI, { type OpenAI as OpenAIType } from 'openai';
import { type ValueOf } from 'shared';
import { type Tiktoken, encoding_for_model } from 'tiktoken';

import { type BaseConfig } from '~/common/config/base-config.package.js';

import { CHAT_MODEL, MAX_TOKEN } from './libs/constants/constants.js';
import { type OpenAIRole } from './libs/enums/open-ai-role.enum.js';
import {
    type Message,
    type OpenAIService as OpenAIServiceModule,
} from './libs/types/types.js';

class OpenAIService implements OpenAIServiceModule {
    private config: BaseConfig;
    private openAi: OpenAIType;
    private modelEncoding: Tiktoken;

    public constructor(config: BaseConfig) {
        this.config = config;
        this.openAi = this.initOpenAi();
        this.modelEncoding = encoding_for_model('gpt-4o-mini');
    }

    private initOpenAi = (): OpenAIType => {
        return new OpenAI({
            apiKey: this.config.ENV.APP.OPEN_AI_KEY,
        });
    };

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

    public async generateText(messages: Message[]): Promise<string> {
        const completion = await this.openAi.chat.completions.create({
            messages,
            model: CHAT_MODEL,
            max_tokens: MAX_TOKEN,
        });
        return completion.choices[0]?.message.content || '';
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
            const removedMessage = messages[1];

            if (!removedMessage) {
                break;
            }

            messages.splice(1, 1);

            totalTokens -= this.modelEncoding.encode(
                removedMessage.content,
            ).length;
        }
    }
}

export { OpenAIService };
