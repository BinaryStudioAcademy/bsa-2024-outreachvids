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
export { type ChatRequestDto } from './types/types.js';
export { chatFormValidationSchema } from './validation-schemas/validation-schemas.js';
