import { type VideoGetAllItemResponseDto } from 'shared';
import { HttpCode, HttpError } from 'shared';
import { v4 as uuidv4 } from 'uuid';

import { type AvatarData } from '~/common/services/azure-ai/avatar-video/types/avatar-data.js';
import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';

import { type VideoService } from '../videos/video.service.js';
import { REQUEST_DELAY } from './constants/constnats.js';
import {
    GenerateAvatarResponseStatus,
    RenderVideoErrorMessage,
} from './enums/enums.js';
import { distributeScriptsToScenes, getFileName } from './helpers/helpers.js';
import {
    type Composition,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';

type HandleRenderVideoArguments = {
    videoRecordId: string;
    avatars: {
        id: string;
        url: string;
    }[];
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

    private async saveAvatarVideo(url: string, id: string): Promise<string> {
        const buffer = await this.azureAIService.getAvatarVideoBuffer(url);

        const fileName = getFileName(id);

        await this.fileService.uploadFile(buffer, fileName);
        return this.fileService.getCloudFrontFileUrl(fileName);
    }

    public async createVideo({
        composition,
        name,
        userId,
    }: RenderAvatarVideoRequestDto & {
        userId: string;
    }): Promise<VideoGetAllItemResponseDto> {
        return await this.videoService.create({
            composition,
            name: name,
            userId,
        });
    }

    public getAvatarsConfigs(composition: Composition): AvatarData[] {
        return distributeScriptsToScenes(composition);
    }

    public async submitAvatarsConfigs(
        configs: AvatarData[],
        userId: string,
        recordId: string,
    ): Promise<string[]> {
        try {
            const responses = await Promise.all(
                configs.map((config) => {
                    return this.azureAIService.renderAvatarVideo({
                        id: uuidv4(),
                        payload: config,
                    });
                }),
            );

            const ids = responses.map((response) => {
                return response.id;
            });

            this.checkAvatarsProcessing(ids, userId, recordId).catch(() => {
                throw new HttpError({
                    message: RenderVideoErrorMessage.RENDER_ERROR,
                    status: HttpCode.BAD_REQUEST,
                });
            });

            return ids;
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    public async checkAvatarsProcessing(
        ids: string[],
        userId: string,
        videoRecordId: string,
    ): Promise<void> {
        try {
            const response = await Promise.all(
                ids.map((id) => {
                    return this.checkAvatarStatus(id);
                }),
            );

            await this.handleSuccessfulAvatarsGeneration({
                avatars: response,
                videoRecordId,
            });
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    private checkAvatarStatus(
        id: string,
    ): Promise<{ id: string; url: string }> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                this.azureAIService
                    .getAvatarVideo(id)
                    .then((response) => {
                        if (
                            response.status ===
                            GenerateAvatarResponseStatus.SUCCEEDED
                        ) {
                            clearInterval(interval);
                            resolve({ id, url: response.outputs.result });
                        } else if (
                            response.status ===
                            GenerateAvatarResponseStatus.FAILED
                        ) {
                            reject(
                                new HttpError({
                                    message:
                                        RenderVideoErrorMessage.RENDER_ERROR,
                                    status: HttpCode.BAD_REQUEST,
                                }),
                            );
                            clearInterval(interval);
                        }
                    })
                    .catch(() => {
                        reject(
                            new HttpError({
                                message: RenderVideoErrorMessage.RENDER_ERROR,
                                status: HttpCode.BAD_REQUEST,
                            }),
                        );
                        clearInterval(interval);
                    });
            }, REQUEST_DELAY);
        });
    }

    private async handleSuccessfulAvatarsGeneration({
        videoRecordId,
        avatars,
    }: HandleRenderVideoArguments): Promise<void> {
        // TODO: REPLACE THIS LOGIC WITH RENDER VIDEO
        // TODO: NOTIFY USER
        const firstAvatarId = avatars[0]?.id;
        const url = avatars[0]?.url;

        if (!firstAvatarId || !url) {
            return;
        }

        const savedUrl = await this.saveAvatarVideo(url, firstAvatarId);

        const videoData = await this.videoService.update(videoRecordId, {
            url: savedUrl,
        });

        if (!videoData) {
            throw new HttpError({
                message: RenderVideoErrorMessage.NOT_SAVED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        await Promise.all(
            avatars.map((avatar) => {
                return this.azureAIService.removeAvatarVideo(avatar.id);
            }),
        );
    }
}

export { AvatarVideoService };
