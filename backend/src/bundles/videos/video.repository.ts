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

    public create(entity: VideoEntity): Promise<VideoEntity> {
        return Promise.resolve(entity);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { VideoRepository };
