import OpenAI, { type OpenAI as OpenAIType } from 'openai';

import { type BaseConfig } from '~/common/config/base-config.package.js';

import { CHAT_MODEL, MAX_TOKEN } from './libs/constants/constants.js';
import {
    type GeneratedText,
    type Message,
    type OpenAIService as OpenAIServiceModule,
} from './libs/types/types.js';

type Constructor = {
    config: BaseConfig;
};

class OpenAIService implements OpenAIServiceModule {
    private config: BaseConfig;
    private openAi: OpenAIType;

    public constructor({ config }: Constructor) {
        this.config = config;
        this.openAi = this.initOpenAi();
    }

    private initOpenAi = (): OpenAIType => {
        return new OpenAI({
            apiKey: this.config.ENV.APP.OPEN_AI_KEY,
        });
    };

    public async generateText(messages: Message[]): Promise<GeneratedText> {
        const completion = await this.openAi.chat.completions.create({
            messages,
            model: CHAT_MODEL,
            max_tokens: MAX_TOKEN,
        });

        const generatedText = completion.choices[0]?.message.content || '';
        return { generatedText };
    }
}

export { OpenAIService };
