import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { ChatController } from './chat.controller.js';
import { OpenAIService } from './open-ai.service.js';

const openAIService = new OpenAIService(config);
const chatController = new ChatController(logger, openAIService);

export { chatController };
