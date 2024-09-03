import { type FastifyRequest } from 'fastify';

import { type Route } from '../types/types.js';

const isRouteInWhiteList = (
    routesWhiteList: Route[],
    request: FastifyRequest,
): boolean => {
    return routesWhiteList.some((route) => {
        return route.path instanceof RegExp
            ? route.path.test(request.url) && route.method === request.method
            : route.path === request.url && route.method === request.method;
    });
};

export { isRouteInWhiteList };
