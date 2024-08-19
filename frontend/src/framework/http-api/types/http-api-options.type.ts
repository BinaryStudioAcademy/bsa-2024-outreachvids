import { type ContentType } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type HttpOptions } from '~/framework/http/http.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
};

export { type HttpApiOptions };
