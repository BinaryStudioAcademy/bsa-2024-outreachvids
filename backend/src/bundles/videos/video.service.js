import { VideoEntity } from '~/bundles/videos/video.entity.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { VideoValidationMessage } from './enums/enums.js';
class VideoService {
    videoRepository;
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async find(videoId) {
        const video = await this.videoRepository.find(videoId);
        if (!video) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HttpCode.NOT_FOUND,
            });
        }
        return video.toObject();
    }
    async findAll() {
        const items = await this.videoRepository.findAll();
        return {
            items: items.map((it) => it.toObject()),
        };
    }
    async create(payload) {
        const video = await this.videoRepository.create(VideoEntity.initializeNew(payload));
        return video.toObject();
    }
    async update(videoId, payload) {
        const updatedVideo = await this.videoRepository.update(videoId, payload);
        if (!updatedVideo) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HttpCode.NOT_FOUND,
            });
        }
        return updatedVideo.toObject();
    }
    async delete(videoId) {
        const isVideoDeleted = await this.videoRepository.delete(videoId);
        if (!isVideoDeleted) {
            throw new HttpError({
                message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
                status: HttpCode.NOT_FOUND,
            });
        }
        return isVideoDeleted;
    }
}
export { VideoService };
