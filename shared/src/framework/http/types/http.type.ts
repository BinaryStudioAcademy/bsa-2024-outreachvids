import { type HttpOptions } from './types.js';

interface Http {
    load(path: string, options: HttpOptions): Promise<Response>;
}

export { type Http };
