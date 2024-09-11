import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AvatarsApi } from './avatars-api.js';

const avatarsApi = new AvatarsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { avatarsApi };
