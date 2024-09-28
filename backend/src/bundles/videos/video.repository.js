import { VideoEntity } from '~/bundles/videos/video.entity.js';
class VideoRepository {
    videoModel;
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async find(videoId) {
        const video = await this.videoModel.query().findById(videoId).execute();
        return video ? VideoEntity.initialize(video) : null;
    }
    async findAll() {
        const videos = await this.videoModel.query().execute();
        return videos.map((it) => VideoEntity.initialize(it));
    }
    async create(entity) {
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
    async update(videoId, payload) {
        const updatedItem = await this.videoModel
            .query()
            .patchAndFetchById(videoId, payload)
            .execute();
        return updatedItem ? VideoEntity.initialize(updatedItem) : null;
    }
    async delete(videoId) {
        const numberOfDeletedRows = await this.videoModel
            .query()
            .deleteById(videoId)
            .execute();
        return Boolean(numberOfDeletedRows);
    }
}
export { VideoRepository };
