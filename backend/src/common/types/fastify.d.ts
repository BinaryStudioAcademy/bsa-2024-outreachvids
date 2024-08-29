import 'fastify';

import { type CurrentUser } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest {
        user: CurrentUser;
    }
}
