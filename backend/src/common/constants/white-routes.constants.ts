import { ApiPath, AuthApiPath } from 'shared';

const WHITE_ROUTES = [
    `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
