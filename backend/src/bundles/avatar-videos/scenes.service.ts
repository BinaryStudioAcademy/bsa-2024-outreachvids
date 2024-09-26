import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type AzureAIService } from '~/common/services/azure-ai/azure-ai.service.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type RemotionAvatarScene } from '~/common/services/remotion/type/remotion-avatar-scene.js';

import { REQUEST_DELAY } from './constants/constnats.js';
import {
    GenerateAvatarResponseStatus,
    RenderVideoErrorMessage,
} from './enums/enums.js';
import { generatedAvatarToRemotionScene } from './helpers/generated-avatars-to-remotion-scenes.helper.js';
import { distributeScriptsToScenes, getFileName } from './helpers/helpers.js';
import {
    type Scene,
    type SceneForRenderAvatar,
    type SceneWithGeneratedAvatar,
    type Script,
} from './types/types.js';

type Constructor = {
    azureAIService: AzureAIService;
    fileService: FileService;
};

class SceneService {
    private azureAIService: AzureAIService;
    private fileService: FileService;

    public constructor({ azureAIService, fileService }: Constructor) {
        this.azureAIService = azureAIService;
        this.fileService = fileService;
    }

    public getScenesConfigs({
        scenes,
        scripts,
    }: {
        scenes: Scene[];
        scripts: Script[];
    }): SceneForRenderAvatar[] {
        return distributeScriptsToScenes({
            scenes,
            scripts,
        });
    }

    public async getScenesForRemotionRender(
        scenesWithGeneratedAvatars: SceneWithGeneratedAvatar[],
    ): Promise<RemotionAvatarScene[]> {
        const scenesWithSavedAvatars = await this.saveGeneratedAvatar(
            scenesWithGeneratedAvatars,
        );

        return generatedAvatarToRemotionScene(scenesWithSavedAvatars);
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

    public async checkAvatarsProcessing(
        scenesForRenderingAvatars: SceneForRenderAvatar[],
    ): Promise<SceneWithGeneratedAvatar[]> {
        try {
            return await Promise.all(
                scenesForRenderingAvatars.map((scene) => {
                    return this.checkAvatarStatus(scene);
                }),
            );
        } catch {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        }
    }

    private async saveAvatarVideo(url: string, id: string): Promise<string> {
        const buffer = await this.azureAIService.getAvatarVideoBuffer(url);

        const fileName = getFileName(id);

        await this.fileService.uploadFile(buffer, fileName);
        return this.fileService.getCloudFrontFileUrl(fileName);
    }

    public async submitAvatarsConfigs(
        scenesForRenderingAvatars: SceneForRenderAvatar[],
    ): Promise<void> {
        try {
            await Promise.all(
                scenesForRenderingAvatars.map((scene) => {
                    return this.azureAIService.renderAvatarVideo({
                        id: scene.id,
                        payload: scene.avatar,
                    });
                }),
            );
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

    public async clearAvatars(
        remotionAvatarScenes: RemotionAvatarScene[],
    ): Promise<void> {
        await this.removeGeneratedAvatars(remotionAvatarScenes);
        await this.removeAvatarsFromBucket(remotionAvatarScenes);
    }

    private async removeGeneratedAvatars(
        scenesWithGeneratedAvatars: RemotionAvatarScene[],
    ): Promise<unknown> {
        return Promise.all(
            scenesWithGeneratedAvatars.map((scene) => {
                return this.azureAIService.removeAvatarVideo(scene.id);
            }),
        );
    }

    private async removeAvatarsFromBucket(
        scenesWithGeneratedAvatars: RemotionAvatarScene[],
    ): Promise<unknown> {
        return Promise.all(
            scenesWithGeneratedAvatars.map((scene) => {
                return this.fileService.deleteFile(getFileName(scene.id));
            }),
        );
    }
}

export { SceneService };
