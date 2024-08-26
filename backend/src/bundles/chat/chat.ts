import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { ChatService } from './char.service.js';
import { ChatController } from './chat.controller.js';
import { OpenAIService } from './open-ai.service.js';

const openAIService = new OpenAIService(config);
const chatService = new ChatService();
const chatController = new ChatController(logger, openAIService, chatService);

export { chatController };
