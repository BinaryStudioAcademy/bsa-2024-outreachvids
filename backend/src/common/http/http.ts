import { BaseHttp } from './base-http.js';

const baseHttp = new BaseHttp();

export { baseHttp };
export { type BaseHttpApi } from './base-http-api.js';
export {
    ContentType,
    HttpCode,
    HttpHeader,
    HTTPMethod,
} from './enums/enums.js';
export { HttpError } from './exceptions/exceptions.js';
export { type Http, type HttpMethod } from './types/types.js';
