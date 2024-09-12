import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { VideosApi } from './videos-api.js';

const videosApi = new VideosApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { videosApi };
