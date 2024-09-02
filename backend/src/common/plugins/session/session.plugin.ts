import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';

import { type BaseConfig } from '~/common/config/base-config.package.js';
import { ControllerHook } from '~/common/plugins/libs/enums/enums.js';

type Options = {
    services: {
        config: BaseConfig;
    };
};

const session = fp<Options>(async (fastify, { services }) => {
    await fastify.register(fastifyCookie);
    await fastify.register(fastifySession, {
        secret: services.config.ENV.APP.SESSION_KEY,
        cookie: { secure: false },
    });

    fastify.addHook(ControllerHook.ON_REQUEST, (request, _replay, done) => {
        if (!request.session.chatHistory) {
            request.session.chatHistory = [];
        }

        done();
    });
});

export { session };
