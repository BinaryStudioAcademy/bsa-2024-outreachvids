import { type UpdateVideoRequestDto } from '~/bundles/videos/types/types.js';
import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { type VideoModel } from '~/bundles/videos/video.model.js';
import { type Repository } from '~/common/types/types.js';

class VideoRepository implements Repository {
    private videoModel: typeof VideoModel;

    public constructor(videoModel: typeof VideoModel) {
        this.videoModel = videoModel;
    }

    public async find(videoId: string): Promise<VideoEntity | null> {
        const video = await this.videoModel.query().findById(videoId).execute();

        return video ? VideoEntity.initialize(video) : null;
    }

    public async findAll(): Promise<VideoEntity[]> {
        const videos = await this.videoModel.query().execute();

        return videos.map((it) => VideoEntity.initialize(it));
    }

    public async create(entity: VideoEntity): Promise<VideoEntity> {
        const { userId, name, url } = entity.toNewObject();
        const item = await this.videoModel
            .query()
            .insert({
                userId,
                name,
                url,
            })
            .returning('*')
            .execute();

        return VideoEntity.initialize(item);
    }

    public async update(
        videoId: string,
        payload: UpdateVideoRequestDto,
    ): Promise<VideoEntity | null> {
        const updatedItem = await this.videoModel
            .query()
            .patchAndFetchById(videoId, payload)
            .execute();

        return updatedItem ? VideoEntity.initialize(updatedItem) : null;
    }

    public async delete(videoId: string): Promise<boolean> {
        const numberOfDeletedRows = await this.videoModel
            .query()
            .deleteById(videoId)
            .execute();

        return Boolean(numberOfDeletedRows);
    }
}

export { VideoRepository };