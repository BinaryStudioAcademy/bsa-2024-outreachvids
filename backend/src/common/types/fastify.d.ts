import 'fastify';

import { type UserGetCurrentResponseDto } from '~/bundles/users/users.js';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserGetCurrentResponseDto;
    }
}
