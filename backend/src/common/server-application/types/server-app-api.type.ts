import { type ServerAppRouteParameters } from './types.js';

interface ServerAppApi {
    version: string;
    routes: ServerAppRouteParameters[];
    generateDoc(): object;
}

export { type ServerAppApi };
