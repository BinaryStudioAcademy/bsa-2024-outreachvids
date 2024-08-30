import { config } from '~/common/config/config.js';

import { AzureAIService } from './azure/azure-ai.service.js';
import { CryptService } from './crypt/crypt.service.js';
import { FileService } from './file/file.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';
import { TokenService } from './token/token.services.js';

const openAIService = new OpenAIService(config);
const cryptService = new CryptService();
const fileService = new FileService(config);
const azureAIService = new AzureAIService(config);

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;
const tokenService = new TokenService(secretKey, expirationTime);

export {
    azureAIService,
    cryptService,
    fileService,
    openAIService,
    tokenService,
};
