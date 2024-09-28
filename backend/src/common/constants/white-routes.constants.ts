import { ApiPath, AuthApiPath } from 'shared';

import { HTTPMethod } from '~/common/http/http.js';

const WHITE_ROUTES = [
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: HTTPMethod.POST,
    },
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        method: HTTPMethod.POST,
    },
    {
        path: `/api/v1${ApiPath.PUBLIC_VIDEO}/`,
        method: HTTPMethod.POST,
    },
    {
        path: /\/v1\/documentation\/.*/,
        method: HTTPMethod.GET,
    },
    {
        path: /^(?!\/api\/v1\b).*/,
        method: HTTPMethod.GET,
    },
];

export { WHITE_ROUTES };
