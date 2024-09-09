import { Buffer } from 'node:buffer';

import {
    SpeechConfig,
    SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';

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
import { type TextToSpeechApi } from './apis/text-to-speech/text-to-speech-api.js';
import { DEFAULT_LANGUAGE } from './constants/constants.js';
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
            .filter((data: AzureGetVoicesResponseDto) =>
                data.Locale.startsWith(DEFAULT_LANGUAGE),
            )
            .map((data: AzureGetVoicesResponseDto) => ({
                name: data.DisplayName,
                shortName: data.ShortName,
                gender: data.Gender,
                locale: data.Locale,
                localeName: data.LocaleName,
                voiceType: data.VoiceType,
            }));

        return { items: data };
    }

    private synthesizeSpeech(
        speechSynthesizer: SpeechSynthesizer,
        text: string,
    ): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            speechSynthesizer.speakTextAsync(
                text,
                (result) => {
                    const { audioData } = result;

                    speechSynthesizer.close();

                    resolve(Buffer.from(audioData));
                },
                (error) => {
                    speechSynthesizer.close();
                    reject(error);
                },
            );
        });
    }

    private getSpeechConfig(voiceName: string): SpeechConfig {
        const speechConfig = SpeechConfig.fromSubscription(
            this.subscriptionKey,
            this.serviceRegion,
        );

        speechConfig.speechSynthesisVoiceName = voiceName;

        return speechConfig;
    }

    public async textToSpeech({
        text,
        voiceName,
    }: GenerateSpeechRequestDto): Promise<GenerateSpeechResponseDto> {
        const audioFileName = `tts_${Date.now()}.wav`;

        const speechConfig = this.getSpeechConfig(voiceName);

        const speechSynthesizer = new SpeechSynthesizer(speechConfig);

        const audioBuffer = await this.synthesizeSpeech(
            speechSynthesizer,
            text,
        );

        await this.fileService.uploadFile(audioBuffer, audioFileName);
        const audioUrl = this.fileService.getCloudFrontFileUrl(audioFileName);

        return { audioUrl };
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
