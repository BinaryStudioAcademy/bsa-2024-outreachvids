import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';

import {
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
} from './types/types.js';

class SpeechService {
    private azureAIService: AzureAIService;

    public constructor(azureAIService: AzureAIService) {
        this.azureAIService = azureAIService;
    }

    public getVoices(): Promise<GetVoicesResponseDto> {
        return this.azureAIService.getVoices();
    }

    public generateSpeech(
        payload: GenerateSpeechRequestDto,
    ): Promise<GenerateSpeechResponseDto> {
        return this.azureAIService.textToSpeech(payload);
    }
}

export { SpeechService };
