import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AvatarsApi } from './avatars-api.js';
import { SpeechApi } from './speech-api.js';

const avatarsApi = new AvatarsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

const speechApi = new SpeechApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { avatarsApi, speechApi };
