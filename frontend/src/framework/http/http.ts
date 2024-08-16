import { BaseHttp } from './base-http.package.js';

const http = new BaseHttp();

export { http };
export { HttpCode, HttpHeader } from './enums/enums.js';
export { HttpError } from './exceptions/exceptions.js';
export { type Http, type HttpOptions } from './types/types.js';
