import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';

import { getFileName } from './helpers/helpers.js';
import {
    type GetAvatarVideoRequestDto,
    type GetAvatarVideoResponseDto,
    type RenderAvatarResponseDto,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';

class AvatarVideoService {
    private azureAIService: AzureAIService;
    private fileService: FileService;

    public constructor(
        azureAIService: AzureAIService,
        fileService: FileService,
    ) {
        this.azureAIService = azureAIService;
        this.fileService = fileService;
    }

    public async renderAvatarVideo(
        payload: RenderAvatarVideoRequestDto,
    ): Promise<RenderAvatarResponseDto> {
        const response = await this.azureAIService.renderAvatarVideo({
            id: Date.now().toString(),
            payload,
        });

        this.checkAvatarProcessing(response.id);

        return response;
    }

    public getAvatarVideo(
        payload: GetAvatarVideoRequestDto,
    ): Promise<GetAvatarVideoResponseDto> {
        return this.azureAIService.getAvatarVideo(payload.id);
    }

    public async saveAvatarVideo(url: string, id: string): Promise<string> {
        const buffer = await this.azureAIService.getAvatarVideoBuffer(url);

        const fileName = getFileName(id);

        await this.fileService.uploadFile(buffer, fileName);
        return this.fileService.getCloudFrontFileUrl(fileName);
    }

    public removeAvatarVideo(id: string): Promise<unknown> {
        return this.azureAIService.removeAvatarVideo(id);
    }

    public checkAvatarProcessing(id: string): void {
        const interval = setInterval((): void => {
            this.azureAIService
                .getAvatarVideo(id)
                .then((response) => {
                    if (response.status === 'Succeeded') {
                        this.saveAvatarVideo(response.outputs.result, id)
                            .then(() => {
                                // TODO: NOTIFY USER
                            })
                            .catch(() => {})
                            .finally(() => {
                                clearInterval(interval);
                            });
                    } else if (response.status === 'Failed') {
                        // TODO: NOTIFY USER
                        clearInterval(interval);
                    }
                })
                .catch(() => {
                    clearInterval(interval);
                });
        }, 4000);
    }
}

export { AvatarVideoService };
