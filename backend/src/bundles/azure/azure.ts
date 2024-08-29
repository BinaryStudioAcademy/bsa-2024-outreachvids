import { logger } from '~/common/logger/logger.js';
import { azureAIService } from '~/common/services/services.js';

import { AzureAIController } from './azure.controller.js';
import { AzureService } from './azure.service.js';

const azureService = new AzureService(azureAIService);
const azureController = new AzureAIController(logger, azureService);

export { azureController, azureService };
