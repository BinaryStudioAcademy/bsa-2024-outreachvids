import fp from 'fastify-plugin';

type Options = {
    routesWhiteList: string[];
};

const authenticateJWT = fp<Options>((fastify, options, done) => {
    // todo
    fastify.addHook('preHandler', (request, reply, done) => {
        if (options.routesWhiteList.includes(request.url)) {
            return done();
        }

        done();
    });

    done();
});

export { authenticateJWT };
