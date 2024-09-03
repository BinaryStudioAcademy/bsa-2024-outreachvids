import { type ContentType } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type HttpOptions } from '~/framework/http/http.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload' | 'credentials' | 'keepAlive'> & {
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
    credentials?: HttpOptions['credentials'];
    keepAlive?: HttpOptions['keepAlive'];
};

export { type HttpApiOptions };
