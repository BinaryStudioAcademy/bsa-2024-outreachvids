import { type AvatarConfig } from 'microsoft-cognitiveservices-speech-sdk';

import { AzureService as BaseAzureService } from '~/common/services/azure/azure.service.js';

class AzureService {
    private baseAzureService: BaseAzureService;

    public constructor() {
        this.baseAzureService = new BaseAzureService();
    }

    public getAvatarConfig(
        character: string,
        style: string,
        voiceName: string,
    ): AvatarConfig {
        return this.baseAzureService.getAvatar(character, style, voiceName);
    }

    public async textToSpeech(text: string): Promise<ArrayBuffer> {
        return await this.baseAzureService.textToSpeech(text);
    }
}

export { AzureService };
