import { type ApiHandlerOptions } from './api-handler-options.type.js';
import { type ApiHandlerResponse } from './api-handler-response.type.js';

type ApiHandler = (
    options: ApiHandlerOptions,
) => ApiHandlerResponse | Promise<ApiHandlerResponse>;

export { type ApiHandler };
