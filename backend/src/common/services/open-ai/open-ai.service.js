import OpenAI from 'openai';
import { CHAT_MODEL, MAX_TOKEN } from './libs/constants/constants.js';
class OpenAIService {
    config;
    openAi;
    constructor(config) {
        this.config = config;
        this.openAi = this.initOpenAi();
    }
    initOpenAi = () => {
        return new OpenAI({
            apiKey: this.config.ENV.APP.OPEN_AI_KEY,
        });
    };
    async generateText(messages) {
        const completion = await this.openAi.chat.completions.create({
            messages,
            model: CHAT_MODEL,
            max_tokens: MAX_TOKEN,
        });
        return completion.choices[0]?.message.content || '';
    }
}
export { OpenAIService };
