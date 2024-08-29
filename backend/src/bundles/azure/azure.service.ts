import { HttpError } from '~/common/http/http.js';
import { type AzureAIService } from '~/common/services/azure/azure-ai.service.js';

import { type AzureGetAvatarResponseDto } from './types/types.js';

class AzureService {
    private azureAIService: AzureAIService;

    public constructor(azureAIService: AzureAIService) {
        this.azureAIService = azureAIService;
    }

    public async getVoices(): Promise<AzureGetAvatarResponseDto[]> {
        try {
            return await this.azureAIService.getAvatarVoices();
        } catch (error) {
            throw new HttpError({
                message: 'Failed to fetch voices',
                status: 500,
                cause: error,
            });
        }
    }

    public async generateSpeech(
        text: string,
        voiceName: string,
    ): Promise<ArrayBuffer> {
        try {
            return await this.azureAIService.textToSpeech(text, voiceName);
        } catch (error) {
            throw new HttpError({
                message: 'Failed to generate speech',
                status: 500,
                cause: error,
            });
        }
    }
}

export { AzureService };
