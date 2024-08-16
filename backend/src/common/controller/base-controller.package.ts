import { type Logger } from '~/common/logger/logger.js';
import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import {
    type ApiHandler,
    type ApiHandlerOptions,
    type Controller,
    type ControllerRouteParameters,
} from './types/types.js';

class BaseController implements Controller {
    private logger: Logger;

    private apiUrl: string;

    public routes: ServerAppRouteParameters[];

    public constructor(logger: Logger, apiPath: string) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, reply) =>
                this.mapHandler(handler, request, reply),
        });
    }

    private async mapHandler(
        handler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        reply: Parameters<ServerAppRouteParameters['handler']>[1],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const handlerOptions = this.mapRequest(request);
        const { status, payload } = await handler(handlerOptions);

        return await reply.status(status).send(payload);
    }

    private mapRequest(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const { body, query, params } = request;

        return {
            body,
            query,
            params,
        };
    }
}

export { BaseController };
