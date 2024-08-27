import fp from 'fastify-plugin';
import { HttpCode, HttpError, HttpHeader } from 'shared';

import { userService } from '~/bundles/users/users.js';
import { tokenService } from '~/common/services/services.js';

import { ErrorMessage, Hook } from './enums/enums.js';
import { type Route } from './types/types.js';
import { isRouteInWhiteList } from './utils/utils.js';

type Options = {
    routesWhiteList: Route[];
};

const authenticateJWT = fp<Options>((fastify, { routesWhiteList }, done) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(Hook.PRE_HANDLER, async (request) => {
        if (isRouteInWhiteList(routesWhiteList, request)) {
            return;
        }

        const authHeader = request.headers[HttpHeader.AUTHORIZATION];

        if (!authHeader) {
            throw new HttpError({
                message: ErrorMessage.MISSING_TOKEN,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        const [, token] = authHeader.split(' ');

        const userId = await tokenService.getUserIdFromToken(token as string);

        if (!userId) {
            throw new HttpError({
                message: ErrorMessage.INVALID_TOKEN,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        const user = await userService.findById(userId);

        if (!user) {
            throw new HttpError({
                message: ErrorMessage.MISSING_USER,
                status: HttpCode.BAD_REQUEST,
            });
        }

        request.user = user;
    });

    done();
});

export { authenticateJWT };
