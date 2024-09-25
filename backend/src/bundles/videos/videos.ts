import { logger } from '~/common/logger/logger.js';
import { fileService, imageService } from '~/common/services/services.js';

import { VideoController } from './video.controller.js';
import { VideoModel } from './video.model.js';
import { VideoRepository } from './video.repository.js';
import { VideoService } from './video.service.js';

const videoRepository = new VideoRepository(VideoModel);
const videoService = new VideoService(
    videoRepository,
    fileService,
    imageService,
);
const videoController = new VideoController(logger, videoService);

export { videoController, videoService };
