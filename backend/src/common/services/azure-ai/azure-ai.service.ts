import fs from 'node:fs/promises';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

import {
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
} from '~/bundles/speech/types/types.js';
import { type BaseConfig } from '~/common/config/base-config.package.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { type FileService } from '../file/file.service.js';
import { type AzureGetVoicesResponseDto } from './types/types.js';

class AzureAIService {
    private fileService: FileService;

    private subscriptionKey: string;
    private serviceRegion: string;

    public constructor(config: BaseConfig, fileService: FileService) {
        this.fileService = fileService;

        this.subscriptionKey = config.ENV.AZURE.SUBSCRIPTION_KEY;
        this.serviceRegion = config.ENV.AZURE.SERVICE_REGION;
    }

    private getVoicesUrl(): string {
        return `https://${this.serviceRegion}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    }

    public async getVoices(): Promise<GetVoicesResponseDto> {
        const url = this.getVoicesUrl();

        const options = {
            headers: {
                'Ocp-Apim-Subscription-Key': this.subscriptionKey,
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

        const filteredData = data
            .filter(
                (data: AzureGetVoicesResponseDto) => data.Locale === 'en-US',
            )
            .map((data: AzureGetVoicesResponseDto) => ({
                name: data.DisplayName,
                shortName: data.ShortName,
                locale: data.Locale,
                localeName: data.LocaleName,
                voiceType: data.VoiceType,
            }));

        return { items: filteredData };
    }

    private synthesizeSpeech(
        speechSynthesizer: SpeechSDK.SpeechSynthesizer,
        text: string,
    ): Promise<SpeechSDK.SpeechSynthesizer> {
        return new Promise((resolve, reject) => {
            speechSynthesizer.speakTextAsync(
                text,
                (result) => {
                    speechSynthesizer.close();

                    if (
                        result.reason ===
                        SpeechSDK.ResultReason.SynthesizingAudioCompleted
                    ) {
                        resolve(speechSynthesizer);
                    }

                    reject(result.errorDetails);
                },
                (error) => {
                    speechSynthesizer.close();
                    reject(error);
                },
            );
        });
    }

    private getSpeechConfig(voiceName: string): SpeechSDK.SpeechConfig {
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
            this.subscriptionKey,
            this.serviceRegion,
        );

        speechConfig.speechSynthesisVoiceName = voiceName;

        return speechConfig;
    }

    private getSpeechSynthesizer(
        audioFileName: string,
        voiceName: string,
    ): SpeechSDK.SpeechSynthesizer {
        const speechConfig = this.getSpeechConfig(voiceName);

        const audioConfig =
            SpeechSDK.AudioConfig.fromAudioFileOutput(audioFileName);

        return new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    }

    public async textToSpeech({
        text,
        voiceName,
    }: GenerateSpeechRequestDto): Promise<GenerateSpeechResponseDto> {
        const audioFileName = `tts_${Date.now()}.wav`;

        try {
            const speechSynthesizer = this.getSpeechSynthesizer(
                audioFileName,
                voiceName,
            );

            await this.synthesizeSpeech(speechSynthesizer, text);

            const fileBuffer = await fs.readFile(audioFileName);

            await this.fileService.uploadFile(fileBuffer, audioFileName);
            const audioUrl =
                this.fileService.getCloudFrontFileUrl(audioFileName);

            return { audioUrl };
        } finally {
            await fs.unlink(audioFileName);
        }
    }
}

export { AzureAIService };
