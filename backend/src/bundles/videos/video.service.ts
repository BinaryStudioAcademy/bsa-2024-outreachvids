import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { type VideoRepository } from '~/bundles/videos/video.repository.js';
import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type ImageService } from '~/common/services/image/image.service.js';
import { type RemotionService } from '~/common/services/remotion/remotion.service.js';
import { tokenService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import { VideoValidationMessage } from './enums/enums.js';
import {
    type CreateVideoRequestDto,
    type Scene,
    type UpdateVideoRequestDto,
    type VideoGetAllItemResponseDto,
    type VideoGetAllResponseDto,
} from './types/types.js';

class VideoService implements Service {
    private videoRepository: VideoRepository;
    private remotionService: RemotionService;
    private imageService: ImageService;
    public constructor(
        videoRepository: VideoRepository,
        remotionService: RemotionService,
        imageService: ImageService,
    ) {
        this.videoRepository = videoRepository;
        this.remotionService = remotionService;
        this.imageService = imageService;
    }

    public async findById(id: string): Promise<VideoGetAllItemResponseDto> {
        const video = await this.videoRepository.findById(id);

        if (!video) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return video.toObject();
    }

    public async findByUserId(userId: string): Promise<VideoGetAllResponseDto> {
        // eslint-disable-next-line no-console
        console.log(userId);
        const items = await this.videoRepository.findByUserId(userId);
        // eslint-disable-next-line no-console
        console.log(items);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findAll(): Promise<VideoGetAllResponseDto> {
        const items = await this.videoRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateVideoRequestDto & { userId: string },
    ): Promise<VideoGetAllItemResponseDto> {
        const previewUrl = await this.imageService.generatePreview(
            payload.composition.scenes[0] as Scene,
        );

        const video = await this.videoRepository.create(
            VideoEntity.initializeNew({
                name: payload.name,
                composition: payload.composition,
                previewUrl,
                userId: payload.userId,
            }),
        );

        return video.toObject();
    }

    public async update(
        id: string,
        payload: UpdateVideoRequestDto,
    ): Promise<VideoGetAllItemResponseDto> {
        const updatedVideo = await this.videoRepository.update(id, payload);

        if (!updatedVideo) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return updatedVideo.toObject();
    }

    public async delete(id: string): Promise<boolean> {
        const { url } = await this.findById(id);

        if (url) {
            const renderIdMatch = url.match(/renders\/([^/]+)/);
            const renderId = renderIdMatch?.[1];

            if (renderId) {
                await this.remotionService.deleteRenderedVideo(renderId);
            }
        }

        const isVideoDeleted = await this.videoRepository.delete(id);

        if (!isVideoDeleted) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return isVideoDeleted;
    }

    public async getVideoIdToken(id: string): Promise<string> {
        const token = await tokenService.createToken(id, false);
        return token.replaceAll('.', '~');
    }
}

export { VideoService };
