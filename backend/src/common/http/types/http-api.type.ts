import { type HttpApiOptions } from './types.js';

type HttpApi = {
    load(path: string, options: HttpApiOptions): Promise<Response>;
};

export { type HttpApi };
