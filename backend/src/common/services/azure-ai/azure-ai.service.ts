import fs from 'node:fs/promises';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

import {
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
} from '~/bundles/speech/types/types.js';
import { type BaseConfig } from '~/common/config/base-config.package.js';

import { type FileService } from '../file/file.service.js';
import {
    type AvatarVideoApi,
    type GetAvatarVideoResponseDto,
    type RenderAvatarVideoApiResponseDto,
    type RenderAvatarVideoArgument,
} from './apis/avatar-video/avatar-video.js';
import { type TextToSpeechApi } from './apis/text-to-speech-api.js';
import { getAvatarConfig } from './helpers/helpers.js';
import { type AzureGetVoicesResponseDto } from './types/types.js';

type Constructor = {
    config: BaseConfig;
    fileService: FileService;
    textToSpeechApi: TextToSpeechApi;
    avatarVideoApi: AvatarVideoApi;
};

class AzureAIService {
    private fileService: FileService;
    private textToSpeechApi: TextToSpeechApi;
    private avatarVideoApi: AvatarVideoApi;

    private subscriptionKey: string;
    private serviceRegion: string;

    public constructor({
        avatarVideoApi,
        config,
        fileService,
        textToSpeechApi,
    }: Constructor) {
        this.fileService = fileService;
        this.textToSpeechApi = textToSpeechApi;
        this.avatarVideoApi = avatarVideoApi;

        this.subscriptionKey = config.ENV.AZURE.SUBSCRIPTION_KEY;
        this.serviceRegion = config.ENV.AZURE.SERVICE_REGION;
    }

    public async getVoices(): Promise<GetVoicesResponseDto> {
        const response = await this.textToSpeechApi.getVoices();

        const data = response
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

        return { items: data };
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

    public async renderAvatarVideo(
        payload: RenderAvatarVideoArgument,
    ): Promise<RenderAvatarVideoApiResponseDto> {
        const { id, payload: avatarPayload } = payload;
        const avatarConfig = getAvatarConfig(avatarPayload);
        return await this.avatarVideoApi.renderAvatarVideo({
            id,
            payload: avatarConfig,
        });
    }

    public async getAvatarVideo(
        id: string,
    ): Promise<GetAvatarVideoResponseDto> {
        return await this.avatarVideoApi.getAvatarVideo(id);
    }

    public async getAvatarVideoBuffer(url: string): Promise<Buffer> {
        return await this.avatarVideoApi.getAvatarVideoBuffer(url);
    }

    public async removeAvatarVideo(id: string): Promise<unknown> {
        return await this.avatarVideoApi.deleteAvatarVideo(id);
    }
}

export { AzureAIService };
