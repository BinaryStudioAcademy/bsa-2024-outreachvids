import axios from 'axios';

import { type BaseConfig } from '~/common/config/base-config.package.js';
import { HttpError } from '~/common/http/http.js';

import { type AzureGetAvatarResponseDto } from './types/types.js';

class AzureAIService {
    private config: BaseConfig;

    public constructor(config: BaseConfig) {
        this.config = config;
    }

    public async getAvatarVoices(): Promise<AzureGetAvatarResponseDto[]> {
        try {
            const url = `https://${this.config.ENV.AZURE.AZURE_SERVICE_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
            const response = await axios.get(url, {
                headers: {
                    'Ocp-Apim-Subscription-Key':
                        this.config.ENV.AZURE.AZURE_SERVICE_KEY,
                },
            });

            return response.data
                .filter(
                    (data: AzureGetAvatarResponseDto) =>
                        data.Locale === 'en-US',
                )
                .map((data: AzureGetAvatarResponseDto) => ({
                    DisplayName: data.DisplayName,
                    ShortName: data.ShortName,
                    Gender: data.Gender,
                    LocaleName: data.LocaleName,
                    StyleList: data.StyleList,
                }));
        } catch (error) {
            throw new HttpError({
                message: 'Failed to get voice names',
                status: 500,
                cause: error,
            });
        }
    }

    public async textToSpeech(
        text: string,
        voiceName: string,
    ): Promise<ArrayBuffer> {
        try {
            const url = `https://${this.config.ENV.AZURE.AZURE_SERVICE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
            const response = await axios.post(
                url,
                `<speak version='1.0' xml:lang='en-US'><voice name='${voiceName}'>${text}</voice></speak>`,
                {
                    headers: {
                        'Ocp-Apim-Subscription-Key':
                            this.config.ENV.AZURE.AZURE_SERVICE_KEY,
                        'Content-Type': 'application/ssml+xml',
                        'X-Microsoft-OutputFormat':
                            'audio-16khz-128kbitrate-mono-mp3',
                    },
                    responseType: 'arraybuffer',
                },
            );
            return response.data;
        } catch (error) {
            throw new HttpError({
                message: 'Failed to generate speech',
                status: 500,
                cause: error,
            });
        }
    }
}

export { AzureAIService };
