import fs from 'node:fs/promises';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

import { type BaseConfig } from '~/common/config/base-config.package.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { fileService } from '../services.js';
import { type AzureGetAvatarVoicesResponseDto } from './types/types.js';

class AzureAIService {
    private config: BaseConfig;
    private azureRegion: string;
    private azureSubscriptionKey: string;

    public constructor(config: BaseConfig) {
        this.config = config;
        this.azureRegion = config.ENV.AZURE.AZURE_SERVICE_REGION;
        this.azureSubscriptionKey = config.ENV.AZURE.AZURE_SERVICE_KEY;
    }

    public async getAvatarVoices(): Promise<AzureGetAvatarVoicesResponseDto[]> {
        const url = `https://${this.config.ENV.AZURE.AZURE_SERVICE_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
        const options = {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key':
                    this.config.ENV.AZURE.AZURE_SERVICE_KEY,
            },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new HttpError({
                message: response.statusText,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
        const data = await response.json();
        return data
            .filter(
                (data: AzureGetAvatarVoicesResponseDto) =>
                    data.Locale === 'en-US',
            )
            .map((data: AzureGetAvatarVoicesResponseDto) => ({
                DisplayName: data.DisplayName,
                ShortName: data.ShortName,
                Gender: data.Gender,
                LocaleName: data.LocaleName,
                StyleList: data.StyleList,
            }));
    }

    public async textToSpeech(
        text: string,
        voiceName: string,
    ): Promise<string> {
        const audioFileName = `ttsConverted_${Date.now()}.wav`;
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
            this.azureSubscriptionKey,
            this.azureRegion,
        );
        const audioConfig =
            SpeechSDK.AudioConfig.fromAudioFileOutput(audioFileName);
        speechConfig.speechSynthesisLanguage = voiceName
            .split('-', 2)
            .join('-');
        speechConfig.speechSynthesisVoiceName = voiceName;
        const speechSynthesizer = new SpeechSDK.SpeechSynthesizer(
            speechConfig,
            audioConfig,
        );
        await new Promise<void>((resolve, reject) => {
            speechSynthesizer.speakTextAsync(
                text,
                (result) => {
                    if (
                        result.reason ===
                        SpeechSDK.ResultReason.SynthesizingAudioCompleted
                    ) {
                        resolve();
                    } else {
                        reject(
                            new Error(
                                `Speech synthesis canceled: ${result.errorDetails}`,
                            ),
                        );
                    }
                    speechSynthesizer.close();
                },
                (error) => {
                    speechSynthesizer.close();
                    reject(error);
                },
            );
        });
        const fileBuffer = await fs.readFile(audioFileName);
        await fileService.uploadFile(fileBuffer, audioFileName);
        const fileURL = await fileService.getFileUrl(audioFileName);
        await fs.unlink(audioFileName);

        return fileURL;
    }
}

export { AzureAIService };
