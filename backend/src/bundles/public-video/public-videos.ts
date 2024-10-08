import { VideoModel } from '~/bundles/videos/video.model.js';
import { VideoRepository } from '~/bundles/videos/video.repository.js';
import { logger } from '~/common/logger/logger.js';
import { imageService } from '~/common/services/services.js';

import { PublicVideoController } from './public-video.controller.js';
import { PublicVideoService } from './public-video.service.js';

const videoRepository = new VideoRepository(VideoModel, imageService);
const videoService = new PublicVideoService(videoRepository);
const publicVideoController = new PublicVideoController(logger, videoService);

export { publicVideoController };
