import { ApiPath, AuthApiPath } from 'shared';
const WHITE_ROUTES = [
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: 'POST',
    },
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        method: 'POST',
    },
];
export { WHITE_ROUTES };
