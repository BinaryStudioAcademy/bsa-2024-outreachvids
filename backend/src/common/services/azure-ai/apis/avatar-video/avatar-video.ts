import { config } from '~/common/config/config.js';
import { baseHttp } from '~/common/http/http.js';

import { AvatarVideoApi } from './avatar-video-api.js';

const avatarVideoApi = new AvatarVideoApi({
    http: baseHttp,
    baseUrl: config.ENV.AZURE.SERVICE_ENDPOINT,
});

export { avatarVideoApi };
export { AvatarVideoApi } from './avatar-video-api.js';
export { AvatarApiPath } from './libs/enums/enums.js';
export {
    type GetAvatarVideoResponseDto,
    type RenderAvatarVideoApiRequestDto,
    type RenderAvatarVideoApiResponseDto,
    type RenderAvatarVideoArgument,
} from './libs/types/types.js';
