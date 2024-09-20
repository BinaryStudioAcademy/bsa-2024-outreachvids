import { BaseHttp } from './base-http.package.js';

const http = new BaseHttp();

export { http };
export { HTTPCode, HTTPHeader, HTTPMethod } from './enums/enums.js';
export { HttpError } from './exceptions/exceptions.js';
export { type Http, type HttpMethod, type HttpOptions } from './types/types.js';
