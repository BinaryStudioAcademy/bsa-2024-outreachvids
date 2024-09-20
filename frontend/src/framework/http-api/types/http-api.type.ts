import { type HTTPApiOptions } from './types.js';

type HttpApi = {
    load(path: string, options: HTTPApiOptions): Promise<Response>;
};

export { type HttpApi };
