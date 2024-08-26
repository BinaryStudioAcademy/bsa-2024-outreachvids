import OpenAI, { type OpenAI as OpenAIType } from 'openai';

import { type BaseConfig } from '~/common/config/base-config.package.js';

import { type Message } from '../../../bundles/chat/libs/types/types.js';
import { CHAT_MODEL, MAX_TOKEN } from './libs/constants/constants.js';
import { type OpenAIService as OpenAIServiceType } from './libs/types/types.js';

class OpenAIService implements OpenAIServiceType {
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
