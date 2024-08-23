import OpenAI, { type OpenAI as OpenAIType } from 'openai';
import { type ValueOf } from 'shared';

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

    public constructor(config: BaseConfig) {
        this.config = config;
        this.openAi = this.initOpenAi();
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

    public async generateText(messages: Message[]): Promise<string> {
        const completion = await this.openAi.chat.completions.create({
            messages,
            model: CHAT_MODEL,
            max_tokens: MAX_TOKEN,
        });

        return completion.choices[0]?.message.content || '';
    }
}

export { OpenAIService };
