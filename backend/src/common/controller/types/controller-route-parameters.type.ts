import { type HttpMethod } from '~/common/http/http.js';
import { type ValidationSchema } from '~/common/types/types.js';

import { type ApiHandler } from './api-handler.type.js';

type ControllerRouteParameters = {
    path: string;
    method: HttpMethod;
    handler: ApiHandler;
    validation?: {
        body?: ValidationSchema;
    };
};

export { type ControllerRouteParameters };
