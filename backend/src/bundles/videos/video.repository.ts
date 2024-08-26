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
        data: { userId?: string; name?: string; url?: string },
    ): Promise<VideoEntity | null> {
        const updatedItem = await this.videoModel
            .query()
            .patchAndFetchById(videoId, data)
            .execute();

        return updatedItem ? VideoEntity.initialize(updatedItem) : null;
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { VideoRepository };
