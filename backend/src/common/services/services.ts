import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';

const openAIService = new OpenAIService(config);
const cryptService = new CryptService();

export { cryptService, openAIService };
