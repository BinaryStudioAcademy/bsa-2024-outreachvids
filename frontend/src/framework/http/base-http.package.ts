import { type Http, type HttpOptions } from './types/types.js';

class BaseHttp implements Http {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { headers, method, payload, credentials, keepAlive } = options;

        return fetch(path, {
            body: payload,
            headers,
            method,
            credentials,
            keepalive: keepAlive,
        });
    }
}

export { BaseHttp };
