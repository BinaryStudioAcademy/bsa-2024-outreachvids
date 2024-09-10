import { HttpCode, HttpError } from 'shared';

import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';

import { type VideoService } from '../videos/video.service.js';
import {
    GenerateAvatarResponseStatus,
    RenderVideoErrorMessage,
} from './enums/enums.js';
import { getFileName } from './helpers/helpers.js';
import {
    type GetAvatarVideoRequestDto,
    type GetAvatarVideoResponseDto,
    type RenderAvatarResponseDto,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';

type HandleRenderVideoArguments = {
    id: string;
    userId: string;
    url: string;
};

class AvatarVideoService {
    private azureAIService: AzureAIService;
    private fileService: FileService;
    private videoService: VideoService;

    public constructor(
        azureAIService: AzureAIService,
        fileService: FileService,
        videoService: VideoService,
    ) {
        this.azureAIService = azureAIService;
        this.fileService = fileService;
        this.videoService = videoService;
    }

    public async getAvatarVideo(
        payload: GetAvatarVideoRequestDto,
    ): Promise<GetAvatarVideoResponseDto> {
        const response = await this.azureAIService.getAvatarVideo(payload.id);

        if (!response?.outputs?.result) {
            throw new HttpError({
                message: RenderVideoErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }
        return { url: response?.outputs?.result };
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

    public async renderAvatarVideo(
        payload: RenderAvatarVideoRequestDto & { userId: string },
    ): Promise<RenderAvatarResponseDto> {
        const { userId, ...avatarConfig } = payload;
        const response = await this.azureAIService.renderAvatarVideo({
            id: Date.now().toString(),
            payload: avatarConfig,
        });

        this.checkAvatarProcessing(response.id, userId);

        return response;
    }

    public checkAvatarProcessing(id: string, userId: string): void {
        const interval = setInterval((): void => {
            this.azureAIService
                .getAvatarVideo(id)
                .then((response) => {
                    if (
                        response.status ===
                        GenerateAvatarResponseStatus.SUCCEEDED
                    ) {
                        this.handleSuccessfulAvatarGeneration({
                            id,
                            userId,
                            url: response.outputs.result,
                        })
                            .then(() => {
                                // TODO: NOTIFY USER
                            })
                            .catch((error) => {
                                throw new HttpError({
                                    message: error.message,
                                    status: error.status,
                                });
                            })
                            .finally(() => {
                                clearInterval(interval);
                            });
                    } else if (
                        response.status === GenerateAvatarResponseStatus.FAILED
                    ) {
                        // TODO: NOTIFY USER
                        clearInterval(interval);
                    }
                })
                .catch((error) => {
                    clearInterval(interval);
                    throw new HttpError({
                        message: error.message,
                        status: error.status,
                    });
                });
        }, 4000);
    }

    private async handleSuccessfulAvatarGeneration({
        id,
        url,
        userId,
    }: HandleRenderVideoArguments): Promise<void> {
        const savedUrl = await this.saveAvatarVideo(url, id);

        const videoData = await this.videoService.create({
            name: getFileName(id),
            url: savedUrl,
            userId,
        });

        if (!videoData) {
            throw new HttpError({
                message: RenderVideoErrorMessage.NOT_SAVED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        await this.azureAIService.removeAvatarVideo(id);
    }
}

export { AvatarVideoService };
