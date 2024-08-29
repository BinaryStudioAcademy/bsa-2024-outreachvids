import { config } from '../config/config.js';
import { AzureAIService } from './azure/azure-ai.service.js';
import { CryptService } from './crypt/crypt.service.js';
import { FileService } from './file/file.service.js';

const cryptService = new CryptService();
const fileService = new FileService(config);
const azureAIService = new AzureAIService(config);

export { azureAIService, cryptService, fileService };
