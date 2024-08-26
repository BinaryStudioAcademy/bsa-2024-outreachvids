import { logger } from '~/common/logger/logger.js';
import { openAIService } from '~/common/services/services.js';

import { ChatService } from './char.service.js';
import { ChatController } from './chat.controller.js';

const chatService = new ChatService();
const chatController = new ChatController(logger, openAIService, chatService);

export { chatController };
