import 'fastify';

import { type UserEntity } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserEntity;
    }
}
