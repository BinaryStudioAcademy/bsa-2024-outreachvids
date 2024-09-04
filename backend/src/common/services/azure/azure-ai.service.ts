import fs from 'node:fs/promises';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

import { type BaseConfig } from '~/common/config/base-config.package.js';
import { HttpCode, HttpError, HTTPMethod } from '~/common/http/http.js';

import { fileService } from '../services.js';
import { type GetAvatarVoicesResponseDto } from './types/types.js';

type BatchSynthesesAvatar = {
    avatarName: string;
    avatarStyle: string;
    textSSML: string;
    voice: string;
};

class AzureAIService {
    private config: BaseConfig;
    private azureRegion: string;
    private azureSubscriptionKey: string;
    private azureEndpoint: string;

    public constructor(config: BaseConfig) {
        this.config = config;
        this.azureRegion = config.ENV.AZURE.AZURE_SERVICE_REGION;
        this.azureSubscriptionKey = config.ENV.AZURE.AZURE_SERVICE_KEY;
        this.azureEndpoint = config.ENV.AZURE.AZURE_SERVICE_ENDPOINT;
    }

    public async getAvatarVoices(): Promise<GetAvatarVoicesResponseDto[]> {
        const url = `https://${this.config.ENV.AZURE.AZURE_SERVICE_REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list`;

        const options = {
            method: HTTPMethod.GET,
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
                (data: GetAvatarVoicesResponseDto) => data.Locale === 'en-US',
            )
            .map((data: GetAvatarVoicesResponseDto) => ({
                displayName: data.DisplayName,
                shortName: data.ShortName,
                locale: data.Locale,
                gender: data.Gender,
                localeName: data.LocaleName,
                styleList: data.StyleList,
            }));
    }

    private synthesizeSpeech(
        speechSynthesizer: SpeechSDK.SpeechSynthesizer,
        text: string,
    ): Promise<SpeechSDK.SpeechSynthesizer> {
        return new Promise((resolve, reject) => {
            speechSynthesizer.speakTextAsync(
                text,
                (result) => {
                    if (
                        result.reason ===
                        SpeechSDK.ResultReason.SynthesizingAudioCompleted
                    ) {
                        speechSynthesizer.close();
                        resolve(speechSynthesizer);
                    } else {
                        speechSynthesizer.close();
                        reject(result.errorDetails);
                    }
                },
                (error) => {
                    speechSynthesizer.close();
                    reject(error);
                },
            );
        });
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

        await this.synthesizeSpeech(speechSynthesizer, text);

        const fileBuffer = await fs.readFile(audioFileName);
        await fileService.uploadFile(fileBuffer, audioFileName);
        const fileURL = await fileService.getFileUrl(audioFileName);
        await fs.unlink(audioFileName);

        return fileURL;
    }

    public async createBatchSynthesesVideo(
        inputs: BatchSynthesesAvatar,
    ): Promise<string> {
        const url = `${this.azureEndpoint}/avatar/batchsyntheses/batchjob-${Date.now()}?api-version=2024-08-01`;
        const requestBody = {
            inputKind: 'SSML',
            synthesisConfig: {
                voice: inputs.voice,
            },
            inputs: [
                {
                    content: inputs.textSSML,
                },
            ],
            avatarConfig: {
                talkingAvatarCharacter: inputs.avatarName,
                talkingAvatarStyle: inputs.avatarStyle,
                videoFormat: 'webm',
                videoCodec: 'vp9',
                subtitleType: 'soft_embedded',
                backgroundColor: 'transparent',
            },
        };

        const response = await fetch(url, {
            method: HTTPMethod.PUT,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': this.azureSubscriptionKey,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new HttpError({
                message: response.statusText,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }
        const data = await response.json();
        return data.id;
    }

    public async getBatchSynthesesVideo(id: string): Promise<unknown> {
        const url = `${this.azureEndpoint}/avatar/batchsyntheses/${id}?api-version=2024-08-01`;

        const response = await fetch(url, {
            method: HTTPMethod.GET,
            headers: {
                'Ocp-Apim-Subscription-Key': this.azureSubscriptionKey,
            },
        });

        if (!response.ok) {
            throw new HttpError({
                message: response.statusText,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        return await response.json();
    }
}

export { AzureAIService };