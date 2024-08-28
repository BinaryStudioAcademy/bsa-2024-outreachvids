import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ChatApi } from './chat-api.js';

const chatApi = new ChatApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { chatApi };
export { type GenerateTextRequestDto } from './types/types.js';
export { textGenerationValidationSchema } from './validation-schemas/validation-schemas.js';
