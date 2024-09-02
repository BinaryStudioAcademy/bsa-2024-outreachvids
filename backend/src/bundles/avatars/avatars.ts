import { logger } from '~/common/logger/logger.js';

import { AvatarController } from './avatar.controller.js';
import { AvatarService } from './avatar.service.js';
import { avatarsConfig } from './config/config.js';

const avatarService = new AvatarService(avatarsConfig);
const avatarController = new AvatarController(logger, avatarService);

export { avatarController };
