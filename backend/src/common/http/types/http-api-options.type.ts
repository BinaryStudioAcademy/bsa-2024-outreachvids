import { type ContentType, type ValueOf } from 'shared';

import { type CustomHeader, type HttpOptions } from './types.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    contentType: ValueOf<typeof ContentType>;
    headers?: CustomHeader;
    payload?: HttpOptions['payload'];
};

export { type HttpApiOptions };
