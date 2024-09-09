import { logger } from '~/common/logger/logger.js';
import { azureAIService, fileService } from '~/common/services/services.js';

import { AvatarVideoController } from './avatar-videos.controller.js';
import { AvatarVideoService } from './avatar-videos.service.js';

const avatarVideoService = new AvatarVideoService(azureAIService, fileService);

const avatarVideoController = new AvatarVideoController(
    logger,
    avatarVideoService,
);

export { avatarVideoController };
