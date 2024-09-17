import { type HttpMethod } from '~/common/http/http.js';

type Route = {
    path: string | RegExp;
    method: HttpMethod;
};

export { type Route };
