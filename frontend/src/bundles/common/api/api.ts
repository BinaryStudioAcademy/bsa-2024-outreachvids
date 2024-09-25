import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { PublicVideosApi } from './public-video-api/public-videos-api.js';
import { VideosApi } from './video-api/videos-api.js';

const videosApi = new VideosApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

const publicVideosApi = new PublicVideosApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { publicVideosApi,videosApi };
