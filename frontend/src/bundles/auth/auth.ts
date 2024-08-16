import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AuthApi } from './auth-api.js';

const authApi = new AuthApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { authApi };
