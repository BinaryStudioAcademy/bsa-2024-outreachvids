import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';
import { ControllerHook } from '~/common/plugins/libs/enums/enums.js';
const session = fp(async (fastify, { services }) => {
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
