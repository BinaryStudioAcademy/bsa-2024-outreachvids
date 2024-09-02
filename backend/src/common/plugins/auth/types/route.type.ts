import { type HttpMethod } from '~/common/http/http.js';

type Route = {
    path: string;
    method: HttpMethod;
};

export { type Route };
