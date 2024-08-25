import { type VideoRepository } from '~/bundles/videos/video.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import {
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
                message: 'Video with this id does not exist',
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

    public create(payload: null): ReturnType<Service['create']> {
        return Promise.resolve(payload);
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { VideoService };
