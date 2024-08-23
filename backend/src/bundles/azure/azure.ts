import { logger } from '~/common/logger/logger.js';

import { AzureController } from './azure.controller.js';
import { AzureService } from './azure.service.js';

const azureService = new AzureService();
const azureController = new AzureController(logger, azureService);

export { azureController, azureService };
