import fp from 'fastify-plugin';
import { HTTPCode, HttpError, HTTPHeader } from 'shared';

import { userService } from '~/bundles/users/users.js';
import { tokenService } from '~/common/services/services.js';

import { ErrorMessage, Hook } from './enums/enums.js';
import { type Route } from './types/types.js';
import { checkIfRouteInWhiteList } from './utils/utils.js';

type Options = {
    routesWhiteList: Route[];
};

const authenticateJWT = fp<Options>((fastify, { routesWhiteList }, done) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(Hook.PRE_HANDLER, async (request) => {
        if (checkIfRouteInWhiteList(routesWhiteList, request)) {
            return;
        }

        const authHeader = request.headers[HTTPHeader.AUTHORIZATION];

        if (!authHeader) {
            throw new HttpError({
                message: ErrorMessage.MISSING_TOKEN,
                status: HTTPCode.UNAUTHORIZED,
            });
        }

        const [, token] = authHeader.split(' ');

        const userId = await tokenService.getIdFromToken(token as string);

        if (!userId) {
            throw new HttpError({
                message: ErrorMessage.INVALID_TOKEN,
                status: HTTPCode.UNAUTHORIZED,
            });
        }

        const user = await userService.findById(userId);

        if (!user) {
            throw new HttpError({
                message: ErrorMessage.MISSING_USER,
                status: HTTPCode.BAD_REQUEST,
            });
        }
        request.user = user.toObject();
    });

    done();
});

export { authenticateJWT };
