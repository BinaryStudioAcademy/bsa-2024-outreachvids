import { logger } from '~/common/logger/logger.js';
import { openAIService } from '~/common/services/services.js';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';
const chatService = new ChatService();
const chatController = new ChatController(logger, openAIService, chatService);
export { chatController };
