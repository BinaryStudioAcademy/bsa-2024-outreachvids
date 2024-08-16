import { type HttpCode } from '~/common/http/http.js';
import { type ValueOf } from '~/common/types/types.js';

type ApiHandlerResponse = {
    status: ValueOf<typeof HttpCode>;
    payload: unknown;
};

export { type ApiHandlerResponse };
