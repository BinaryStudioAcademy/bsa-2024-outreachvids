import { type AvatarSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';

import { AzureService as BaseAzureService } from '~/common/services/azure/azure.service.js';

class AzureService {
    private baseAzureService: BaseAzureService;

    public constructor() {
        this.baseAzureService = new BaseAzureService();
    }

    public async getAvatarConfig(
        character: string,
        style: string,
        voiceName: string,
    ): Promise<AvatarSynthesizer> {
        return await this.baseAzureService.getAvatar(character, style, voiceName);
    }

    public async textToSpeech(text: string): Promise<ArrayBuffer> {
        return await this.baseAzureService.textToSpeech(text);
    }
}

export { AzureService };
