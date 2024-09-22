import { type VideoGetAllItemResponseDto } from 'shared';
import { HTTPCode, HttpError } from 'shared';

import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type RemotionService } from '~/common/services/remotion/remotion.service.js';

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
    type RenderAvatarVideoRequestDto,
    type SceneForRenderAvatar,
    type SceneWithGeneratedAvatar,
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

    public getScenesConfigs(composition: Composition): SceneForRenderAvatar[] {
        return distributeScriptsToScenes(composition);
    }

    public async submitAvatarsConfigs(
        scenesForRenderAvatar: SceneForRenderAvatar[],
        recordId: string,
    ): Promise<void> {
        try {
            await Promise.all(
                scenesForRenderAvatar.map((scene) => {
                    return this.azureAIService.renderAvatarVideo({
                        id: scene.id,
                        payload: scene.avatar,
                    });
                }),
            );

            this.checkAvatarsProcessing(scenesForRenderAvatar, recordId).catch(
                () => {
                    throw new HttpError({
                        message: RenderVideoErrorMessage.RENDER_ERROR,
                        status: HTTPCode.BAD_REQUEST,
                    });
                },
            );
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    public async checkAvatarsProcessing(
        scenesForRenderAvatar: SceneForRenderAvatar[],
        videoRecordId: string,
    ): Promise<void> {
        try {
            const response = await Promise.all(
                scenesForRenderAvatar.map((scene) => {
                    return this.checkAvatarStatus(scene);
                }),
            );

            await this.handleSuccessfulAvatarsGeneration({
                scenesWithGeneratedAvatars: response,
                videoRecordId,
            });
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    private checkAvatarStatus(
        scene: SceneForRenderAvatar,
    ): Promise<SceneWithGeneratedAvatar> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                this.azureAIService
                    .getAvatarVideo(scene.id)
                    .then((response) => {
                        if (
                            response.status ===
                            GenerateAvatarResponseStatus.SUCCEEDED
                        ) {
                            clearInterval(interval);

                            resolve({
                                ...scene,
                                avatar: {
                                    url: response.outputs.result,
                                },
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
        scenesWithGeneratedAvatars,
    }: {
        videoRecordId: string;
        scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[];
    }): Promise<void> {
        const scenesWithSavedAvatars = await this.saveGeneratedAvatar(
            scenesWithGeneratedAvatars,
        );
        const scenesForRendering = generatedAvatarToRemotionScene(
            scenesWithSavedAvatars,
        );

        const renderId = await this.remotionService.renderVideo({
            scenes: scenesForRendering,
            totalDurationInFrames: getTotalDuration(scenesForRendering),
        });

        const url =
            await this.remotionService.getRemotionRenderProgress(renderId);

        await this.removeGeneratedAvatars(scenesWithSavedAvatars);
        await this.removeAvatarsFromBucket(scenesWithSavedAvatars);

        if (!url) {
            return;
        }
        // TODO: NOTIFY USER
        await this.videoService.update(videoRecordId, { url });
    }

    private async removeGeneratedAvatars(
        scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[],
    ): Promise<unknown> {
        return Promise.all(
            scenesWithGeneratedAvatars.map((scene) => {
                return this.azureAIService.removeAvatarVideo(scene.id);
            }),
        );
    }

    private async saveGeneratedAvatar(
        scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[],
    ): Promise<SceneWithGeneratedAvatar[]> {
        const urls = await Promise.all(
            scenesWithGeneratedAvatars.map(async (scene) => {
                return this.saveAvatarVideo(scene.avatar.url, scene.id);
            }),
        );

        return scenesWithGeneratedAvatars.map((scene, index) => ({
            ...scene,
            avatar: {
                url: urls[index] as string,
            },
        }));
    }

    private async removeAvatarsFromBucket(
        scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[],
    ): Promise<unknown> {
        return Promise.all(
            scenesWithGeneratedAvatars.map((scene) => {
                return this.fileService.deleteFile(getFileName(scene.id));
            }),
        );
    }
}

export { AvatarVideoService };
