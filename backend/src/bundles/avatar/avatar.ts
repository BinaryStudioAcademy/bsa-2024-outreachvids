import { logger } from '~/common/logger/logger.js';
import { azureAIService } from '~/common/services/services.js';

import { AvatarController } from './avatar.controller.js';
import { AvatarService } from './avatar.service.js';

const avatarService = new AvatarService(azureAIService);
const avatarController = new AvatarController(logger, avatarService);

export { avatarController, avatarService };
