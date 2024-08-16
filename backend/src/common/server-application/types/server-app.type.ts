import { type ServerAppRouteParameters } from './types.js';

type ServerApp = {
    addRoute(parameters: ServerAppRouteParameters): void;
    addRoutes(parameters: ServerAppRouteParameters[]): void;
};

export { type ServerApp };
