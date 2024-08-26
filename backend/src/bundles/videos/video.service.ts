import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { type VideoRepository } from '~/bundles/videos/video.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { VideoValidationMessage } from './enums/enums.js';
import {
    type CreateVideoRequestDto,
    type UpdateVideoRequestDto,
    type VideoGetAllItemResponseDto,
    type VideoGetAllResponseDto,
} from './types/types.js';

class VideoService implements Service {
    private videoRepository: VideoRepository;

    public constructor(videoRepository: VideoRepository) {
        this.videoRepository = videoRepository;
    }

    public async find(videoId: string): Promise<VideoGetAllItemResponseDto> {
        const video = await this.videoRepository.find(videoId);

        if (!video) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return video.toObject();
    }

    public async findAll(): Promise<VideoGetAllResponseDto> {
        const items = await this.videoRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateVideoRequestDto,
    ): Promise<VideoGetAllItemResponseDto> {
        const video = await this.videoRepository.create(
            VideoEntity.initializeNew(payload),
        );

        return video.toObject();
    }

    public async update(
        videoId: string,
        payload: UpdateVideoRequestDto,
    ): Promise<VideoGetAllItemResponseDto> {
        const updatedVideo = await this.videoRepository.update(
            videoId,
            payload,
        );

        if (!updatedVideo) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return updatedVideo.toObject();
    }

    public async delete(videoId: string): Promise<boolean> {
        return await this.videoRepository.delete(videoId);
    }
}

export { VideoService };
