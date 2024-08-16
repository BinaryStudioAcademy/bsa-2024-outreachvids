import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import { type ControllerRouteParameters } from './types.js';

type Controller = {
    routes: ServerAppRouteParameters[];
    addRoute(options: ControllerRouteParameters): void;
};

export { type Controller };
