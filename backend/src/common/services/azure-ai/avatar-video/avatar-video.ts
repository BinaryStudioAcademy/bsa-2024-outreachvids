import { config } from '~/common/config/config.js';
import { baseHttp } from '~/common/http/http.js';

import { AvatarVideoApi } from './avatar-video-base.js';

const avatarVideoApi = new AvatarVideoApi({
    http: baseHttp,
    baseUrl: config.ENV.AZURE.SERVICE_ENDPOINT,
});

export { avatarVideoApi };
