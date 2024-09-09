import { type ContentType, type ValueOf } from 'shared';

import { type CustomHeader, type HttpOptions } from './types.js';

type HttpApiOptions = Omit<
    HttpOptions,
    'headers' | 'payload' | 'credentials' | 'keepAlive'
> & {
    contentType: ValueOf<typeof ContentType>;
    headers?: CustomHeader;
    payload?: HttpOptions['payload'];
    credentials?: HttpOptions['credentials'];
    keepAlive?: HttpOptions['keepAlive'];
};

export { type HttpApiOptions };
