import { logger } from '~/common/logger/logger.js';
import {
    azureAIService,
    fileService,
    remotionService,
} from '~/common/services/services.js';

import { videoService } from '../videos/videos.js';
import { AvatarVideoController } from './avatar-videos.controller.js';
import { AvatarVideoService } from './avatar-videos.service.js';
import { SceneService } from './scenes.service.js';

const scenesService = new SceneService({ azureAIService, fileService });

const avatarVideoService = new AvatarVideoService({
    videoService,
    remotionService,
    scenesService,
});

const avatarVideoController = new AvatarVideoController(
    logger,
    avatarVideoService,
);

export { avatarVideoController };
