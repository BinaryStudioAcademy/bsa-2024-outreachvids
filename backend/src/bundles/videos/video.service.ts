import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { type VideoRepository } from '~/bundles/videos/video.repository.js';
import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type ImageService } from '~/common/services/image/image.service.js';
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
    private fileService: FileService;
    private imageService: ImageService;

    public constructor(
        videoRepository: VideoRepository,
        fileService: FileService,
        imageService: ImageService,
    ) {
        this.videoRepository = videoRepository;
        this.fileService = fileService;
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
        const items = await this.videoRepository.findByUserId(userId);

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
        const previewUrl = this.imageService.generatePreview(
            payload.composition,
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
        const { name } = await this.findById(id);

        await this.fileService.deleteFile(name);

        const isVideoDeleted = await this.videoRepository.delete(id);

        if (!isVideoDeleted) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return isVideoDeleted;
    }
}

export { VideoService };
