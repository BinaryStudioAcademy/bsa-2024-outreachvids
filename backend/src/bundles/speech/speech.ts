import { logger } from '~/common/logger/logger.js';
import { azureAIService } from '~/common/services/services.js';

import { SpeechController } from './speech.controller.js';
import { SpeechService } from './speech.service.js';

const speechService = new SpeechService(azureAIService);
const speechController = new SpeechController(logger, speechService);

export { speechController, speechService };
