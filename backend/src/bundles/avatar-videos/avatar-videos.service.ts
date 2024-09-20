import { type VideoGetAllItemResponseDto } from 'shared';
import { HTTPCode, HttpError } from 'shared';
import { v4 as uuidv4 } from 'uuid';

import { type AvatarData } from '~/common/services/azure-ai/avatar-video/types/avatar-data.js';
import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type RemotionService } from '~/common/services/remotion/remotion.service.js';
import { type RemotionAvatarScene } from '~/common/services/remotion/type/types.js';

import { type VideoService } from '../videos/video.service.js';
import { REQUEST_DELAY } from './constants/constnats.js';
import {
    GenerateAvatarResponseStatus,
    RenderVideoErrorMessage,
} from './enums/enums.js';
import { generatedAvatarToRemotionScene } from './helpers/generated-avatars-to-remotion-scenes.helper.js';
import {
    distributeScriptsToScenes,
    getFileName,
    getTotalDuration,
} from './helpers/helpers.js';
import {
    type Composition,
    type GeneratedAvatarData,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';

type Constructor = {
    azureAIService: AzureAIService;
    fileService: FileService;
    videoService: VideoService;
    remotionService: RemotionService;
};

class AvatarVideoService {
    private azureAIService: AzureAIService;
    private fileService: FileService;
    private videoService: VideoService;
    private remotionService: RemotionService;

    public constructor({
        azureAIService,
        fileService,
        remotionService,
        videoService,
    }: Constructor) {
        this.azureAIService = azureAIService;
        this.fileService = fileService;
        this.videoService = videoService;
        this.remotionService = remotionService;
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

    public async updateVideo({
        videoId,
        composition,
        name,
    }: RenderAvatarVideoRequestDto): Promise<VideoGetAllItemResponseDto> {
        return await this.videoService.update(videoId as string, {
            composition,
            name: name,
        });
    }

    public getAvatarsConfigs(composition: Composition): AvatarData[] {
        return distributeScriptsToScenes(composition);
    }

    public async submitAvatarsConfigs(
        configs: AvatarData[],
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

            this.checkAvatarsProcessing(ids, recordId).catch(() => {
                throw new HttpError({
                    message: RenderVideoErrorMessage.RENDER_ERROR,
                    status: HTTPCode.BAD_REQUEST,
                });
            });

            return ids;
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    public async checkAvatarsProcessing(
        ids: string[],
        videoRecordId: string,
    ): Promise<void> {
        try {
            const response = await Promise.all(
                ids.map((id) => {
                    return this.checkAvatarStatus(id);
                }),
            );

            await this.handleSuccessfulAvatarsGeneration({
                generatedAvatars: response,
                videoRecordId,
            });
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    private checkAvatarStatus(id: string): Promise<GeneratedAvatarData> {
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
                            resolve({
                                id,
                                url: response.outputs.result,
                                durationInMilliseconds:
                                    response.properties.durationInMilliseconds,
                            });
                        } else if (
                            response.status ===
                            GenerateAvatarResponseStatus.FAILED
                        ) {
                            reject(
                                new HttpError({
                                    message:
                                        RenderVideoErrorMessage.RENDER_ERROR,
                                    status: HTTPCode.BAD_REQUEST,
                                }),
                            );
                            clearInterval(interval);
                        }
                    })
                    .catch(() => {
                        reject(
                            new HttpError({
                                message: RenderVideoErrorMessage.RENDER_ERROR,
                                status: HTTPCode.BAD_REQUEST,
                            }),
                        );
                        clearInterval(interval);
                    });
            }, REQUEST_DELAY);
        });
    }

    private async handleSuccessfulAvatarsGeneration({
        videoRecordId,
        generatedAvatars,
    }: {
        videoRecordId: string;
        generatedAvatars: GeneratedAvatarData[];
    }): Promise<void> {
        const scenes = generatedAvatarToRemotionScene(generatedAvatars);
        const scenesWithSavedAvatars = await this.saveGeneratedAvatar(scenes);

        const renderId = await this.remotionService.renderVideo({
            scenes: scenesWithSavedAvatars,
            totalDurationInFrames: getTotalDuration(scenesWithSavedAvatars),
        });

        const url =
            await this.remotionService.getRemotionRenderProgress(renderId);

        if (url) {
            // TODO: NOTIFY USER
            await this.updateVideoRecord(videoRecordId, url);
        }

        await this.removeGeneratedAvatars(generatedAvatars);
        await this.removeAvatarsFromBucket(generatedAvatars);
    }

    private async updateVideoRecord(
        videoRecordId: string,
        videoUrl: string,
    ): Promise<void> {
        const videoData = await this.videoService.update(videoRecordId, {
            url: videoUrl,
        });

        if (!videoData) {
            throw new HttpError({
                message: RenderVideoErrorMessage.NOT_SAVED,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    private async removeGeneratedAvatars(
        generatedAvatars: GeneratedAvatarData[],
    ): Promise<unknown> {
        return Promise.all(
            generatedAvatars.map((avatar) => {
                return this.azureAIService.removeAvatarVideo(avatar.id);
            }),
        );
    }

    private async saveGeneratedAvatar(
        generatedAvatars: RemotionAvatarScene[],
    ): Promise<RemotionAvatarScene[]> {
        return Promise.all(
            generatedAvatars.map(async (avatar) => {
                return {
                    durationInFrames: avatar.durationInFrames,
                    id: avatar.id,
                    url: await this.saveAvatarVideo(avatar.url, avatar.id),
                };
            }),
        );
    }

    private async removeAvatarsFromBucket(
        generatedAvatars: GeneratedAvatarData[],
    ): Promise<unknown> {
        return Promise.all(
            generatedAvatars.map((avatar) => {
                return this.fileService.deleteFile(getFileName(avatar.id));
            }),
        );
    }
}

export { AvatarVideoService };
