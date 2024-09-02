import { logger } from '~/common/logger/logger.js';

import { AvatarController } from './avatar.controller.js';
import { AvatarModel } from './avatar.model.js';
import { AvatarRepository } from './avatar.repository.js';
import { AvatarService } from './avatar.service.js';

const avatarRepository = new AvatarRepository(AvatarModel);
const avatarService = new AvatarService(avatarRepository);
const avatarController = new AvatarController(logger, avatarService);

export { avatarController };
