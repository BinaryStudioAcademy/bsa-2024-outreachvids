class BaseController {
    logger;
    apiUrl;
    routes;
    constructor(logger, apiPath) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }
    addRoute(options) {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;
        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, reply) => this.mapHandler(handler, request, reply),
        });
    }
    async mapHandler(handler, request, reply) {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);
        const handlerOptions = this.mapRequest(request);
        const { status, payload } = await handler(handlerOptions);
        return await reply.status(status).send(payload);
    }
    mapRequest(request) {
        const { body, query, params, session } = request;
        return {
            body,
            query,
            params,
            session,
        };
    }
}
export { BaseController };
