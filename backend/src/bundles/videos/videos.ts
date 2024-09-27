import { logger } from '~/common/logger/logger.js';
import { imageService, remotionService } from '~/common/services/services.js';

import { VideoController } from './video.controller.js';
import { VideoModel } from './video.model.js';
import { VideoRepository } from './video.repository.js';
import { VideoService } from './video.service.js';

const videoRepository = new VideoRepository(VideoModel, imageService);
const videoService = new VideoService(
    videoRepository,
    remotionService,
    imageService,
);
const videoController = new VideoController(logger, videoService);

export { videoController, videoService };
