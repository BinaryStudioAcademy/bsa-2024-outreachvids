import { type UpdateVideoRequestDto } from '~/bundles/videos/types/types.js';
import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { type VideoModel } from '~/bundles/videos/video.model.js';
import { type ImageService } from '~/common/services/image/image.service.js';
import { type Repository } from '~/common/types/types.js';

class VideoRepository implements Repository {
    private videoModel: typeof VideoModel;
    private imageService: ImageService;

    public constructor(
        videoModel: typeof VideoModel,
        imageService: ImageService,
    ) {
        this.videoModel = videoModel;
        this.imageService = imageService;
    }

    public async findById(id: string): Promise<VideoEntity | null> {
        const video = await this.videoModel.query().findById(id).execute();

        return video ? VideoEntity.initialize(video) : null;
    }

    public async findByUserId(userId: string): Promise<VideoEntity[]> {
        const videos = await this.videoModel
            .query()
            .where('userId', userId)
            .execute();

        return videos.map((it) => VideoEntity.initialize(it));
    }

    public async findAll(): Promise<VideoEntity[]> {
        const videos = await this.videoModel.query().execute();

        return videos.map((it) => VideoEntity.initialize(it));
    }

    public async create(entity: VideoEntity): Promise<VideoEntity> {
        const { userId, name, url, composition, previewUrl } =
            entity.toNewObject();

        const item = await this.videoModel
            .query()
            .insert({
                userId,
                name,
                composition,
                previewUrl,
                url,
            })
            .returning('*')
            .execute();

        return VideoEntity.initialize(item);
    }

    public async update(
        id: string,
        payload: UpdateVideoRequestDto,
    ): Promise<VideoEntity | null> {
        const data: Partial<VideoModel> = {};

        if (payload.composition) {
            data.composition = payload.composition;
            data.previewUrl = await this.imageService.generatePreview(
                payload.composition,
            );
        }

        if (payload.name) {
            data.name = payload.name;
        }

        if (payload.url) {
            data.url = payload.url;
        }

        const updatedItem = await this.videoModel
            .query()
            .patchAndFetchById(id, data)
            .execute();

        return updatedItem ? VideoEntity.initialize(updatedItem) : null;
    }

    public async delete(id: string): Promise<boolean> {
        const numberOfDeletedRows = await this.videoModel
            .query()
            .deleteById(id)
            .execute();

        return Boolean(numberOfDeletedRows);
    }
}

export { VideoRepository };
