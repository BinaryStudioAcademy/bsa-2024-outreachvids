import { HttpCode, HttpError } from '~/common/http/http.js';
import { type AzureAIService } from '~/common/services/azure/azure-ai.service.js';

import { AvatarTTSErrorMessages } from './enums/enums.js';
import { type GetAvatarVoicesResponseDto } from './types/types.js';

class AvatarService {
    private azureAIService: AzureAIService;

    public constructor(azureAIService: AzureAIService) {
        this.azureAIService = azureAIService;
    }

    public async getVoices(): Promise<GetAvatarVoicesResponseDto[]> {
        const voices = await this.azureAIService.getAvatarVoices();

        if (!voices) {
            throw new HttpError({
                message: AvatarTTSErrorMessages.VOICES_NOT_GOTTEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return voices;
    }

    public async generateSpeech(
        text: string,
        voiceName: string,
    ): Promise<string> {
        return await this.azureAIService.textToSpeech(text, voiceName);
    }
}

export { AvatarService };
