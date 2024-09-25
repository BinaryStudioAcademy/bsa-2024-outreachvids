import { config } from '~/common/config/config.js';

import { avatarVideoApi } from './azure-ai/avatar-video/avatar-video.js';
import { AzureAIService } from './azure-ai/azure-ai.service.js';
import { textToSpeechApi } from './azure-ai/text-to-speech/text-to-speech.js';
import { CryptService } from './crypt/crypt.service.js';
import { FileService } from './file/file.service.js';
import { ImageService } from './image/image.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';
import { RemotionService } from './remotion/remotion.service.js';
import { TokenService } from './token/token.services.js';

const remotionService = new RemotionService(config);
const openAIService = new OpenAIService(config);
const cryptService = new CryptService();
const fileService = new FileService(config);
const azureAIService = new AzureAIService({
    config,
    fileService,
    textToSpeechApi,
    avatarVideoApi,
});

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;
const tokenService = new TokenService(secretKey, expirationTime);
const imageService = new ImageService(fileService);

export {
    azureAIService,
    cryptService,
    fileService,
    imageService,
    openAIService,
    remotionService,
    tokenService,
};
