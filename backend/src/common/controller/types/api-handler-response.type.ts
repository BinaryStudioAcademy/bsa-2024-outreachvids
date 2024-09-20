import { type HTTPCode } from '~/common/http/http.js';
import { type ValueOf } from '~/common/types/types.js';

type ApiHandlerResponse = {
    status: ValueOf<typeof HTTPCode>;
    payload: unknown;
};

export { type ApiHandlerResponse };
