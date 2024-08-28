import { config } from '~/common/config/config.js';

import { CryptService } from './crypt/crypt.service.js';
import { FileService } from './file/file.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';

const openAIService = new OpenAIService(config);
const cryptService = new CryptService();
const fileService = new FileService(config);

export { cryptService, fileService, openAIService };
