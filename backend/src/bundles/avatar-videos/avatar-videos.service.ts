import { type VideoGetAllItemResponseDto, HTTPCode, HttpError } from 'shared';

import { AvatarVideoEvent } from '~/common/enums/enums.js';
import { type RemotionService } from '~/common/services/remotion/remotion.service.js';
import { socketEvent } from '~/common/socket/socket.js';

import { type VideoService } from '../videos/video.service.js';
import { RenderVideoErrorMessage } from './enums/enums.js';
import { getTotalDuration } from './helpers/helpers.js';
import { type SceneService } from './scenes.service.js';
import {
    type Composition,
    type CompositionWithGeneratedAvatars,
    type CompositionWithScenesForRenderAvatar,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';

type Constructor = {
    videoService: VideoService;
    remotionService: RemotionService;
    scenesService: SceneService;
};

class AvatarVideoService {
    private videoService: VideoService;
    private remotionService: RemotionService;
    private scenesService: SceneService;

    public constructor({
        remotionService,
        videoService,
        scenesService,
    }: Constructor) {
        this.videoService = videoService;
        this.remotionService = remotionService;
        this.scenesService = scenesService;
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

    public async renderVideo(
        composition: Composition,
        videoRecordId: string,
    ): Promise<void> {
        const scenesForAvatarsRendering = this.scenesService.getScenesConfigs({
            scenes: composition.scenes,
            scripts: composition.scripts,
        });

        await this.scenesService.submitAvatarsConfigs(
            scenesForAvatarsRendering,
        );

        this.handleRenderingVideo(
            {
                ...composition,
                scenes: scenesForAvatarsRendering,
            },
            videoRecordId,
        ).catch(() => {
            throw new HttpError({
                message: RenderVideoErrorMessage.RENDER_ERROR,
                status: HTTPCode.BAD_REQUEST,
            });
        });
    }

    public async handleRenderingVideo(
        composition: CompositionWithScenesForRenderAvatar,
        videoRecordId: string,
    ): Promise<void> {
        const scenesWithGeneratedAvatar =
            await this.scenesService.checkAvatarsProcessing(composition.scenes);

        await this.handleSuccessfulAvatarsGeneration({
            videoRecordId,
            compositionWithGeneratedAvatars: {
                ...composition,
                scenes: scenesWithGeneratedAvatar,
            },
        });
    }

    private async handleSuccessfulAvatarsGeneration({
        videoRecordId,
        compositionWithGeneratedAvatars,
    }: {
        videoRecordId: string;
        compositionWithGeneratedAvatars: CompositionWithGeneratedAvatars;
    }): Promise<void> {
        const compositionForRender = {
            ...compositionWithGeneratedAvatars,
            scenes: await this.scenesService.getScenesForRemotionRender(
                compositionWithGeneratedAvatars.scenes,
            ),
        };

        const renderId = await this.remotionService.renderVideo({
            ...compositionForRender,
            totalDurationInFrames: getTotalDuration(
                compositionForRender.scenes,
            ),
        });

        const url =
            await this.remotionService.getRemotionRenderProgress(renderId);

        if (url) {
            // TODO: NOTIFY USER
            await this.videoService.update(videoRecordId, { url });
            socketEvent.emitNotification(AvatarVideoEvent.RENDER_SUCCESS);
        }

        await this.scenesService.clearAvatars(compositionForRender.scenes);
    }
}

export { AvatarVideoService };
