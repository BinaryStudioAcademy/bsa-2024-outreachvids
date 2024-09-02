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
        path: /\/v1\/documentation\/.*/,
        method: 'GET',
    },
];

export { WHITE_ROUTES };
