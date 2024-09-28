import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import { ServerErrorType } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { session } from '~/common/plugins/session/session.plugin.js';
import { WHITE_ROUTES } from '../constants/constants.js';
import { authenticateJWT } from '../plugins/plugins.js';
class BaseServerApp {
    config;
    logger;
    database;
    apis;
    app;
    constructor({ config, logger, database, apis }) {
        this.config = config;
        this.logger = logger;
        this.database = database;
        this.apis = apis;
        this.app = Fastify();
    }
    addRoute(parameters) {
        const { path, method, handler, validation } = parameters;
        this.app.route({
            url: path,
            method,
            handler,
            schema: {
                body: validation?.body,
            },
        });
        this.logger.info(`Route: ${method} ${path} is registered`);
    }
    async initServe() {
        const staticPath = join(dirname(fileURLToPath(import.meta.url)), '../../../public');
        await this.app.register(fastifyStatic, {
            root: staticPath,
            prefix: '/',
        });
        this.app.setNotFoundHandler(async (_request, response) => {
            await response.sendFile('index.html', staticPath);
        });
    }
    addRoutes(parameters) {
        for (const it of parameters) {
            this.addRoute(it);
        }
    }
    initRoutes() {
        const routers = this.apis.flatMap((it) => it.routes);
        this.addRoutes(routers);
    }
    async initMiddlewares() {
        await Promise.all(this.apis.map(async (it) => {
            this.logger.info(`Generate swagger documentation for API ${it.version}`);
            await this.app.register(swagger, {
                mode: 'static',
                specification: {
                    document: it.generateDoc(),
                },
            });
            await this.app.register(swaggerUi, {
                routePrefix: `${it.version}/documentation`,
            });
        }));
    }
    registerPlugins() {
        this.app.register(authenticateJWT, {
            routesWhiteList: WHITE_ROUTES,
        });
        this.app.register(session, {
            services: {
                config: this.config,
            },
        });
        this.app.register(fastifyMultipart, {
            limits: {
                fileSize: Number.POSITIVE_INFINITY,
                files: 1,
            },
        });
    }
    initValidationCompiler() {
        this.app.setValidatorCompiler(({ schema }) => {
            return (data) => {
                return schema.parse(data);
            };
        });
    }
    initErrorHandler() {
        this.app.setErrorHandler((error, _request, reply) => {
            if ('issues' in error) {
                this.logger.error(`[Validation Error]: ${error.message}`);
                for (const issue of error.issues) {
                    this.logger.error(`[${issue.path.toString()}] — ${issue.message}`);
                }
                const response = {
                    details: error.issues.map((issue) => ({
                        message: issue.message,
                        path: issue.path,
                    })),
                    errorType: ServerErrorType.VALIDATION,
                    message: error.message,
                };
                return reply
                    .status(HttpCode.UNPROCESSED_ENTITY)
                    .send(response);
            }
            if (error instanceof HttpError) {
                this.logger.error(`[Http Error]: ${error.status.toString()} – ${error.message}`);
                const response = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };
                return reply.status(error.status).send(response);
            }
            this.logger.error(error.message);
            const response = {
                errorType: ServerErrorType.COMMON,
                message: error.message,
            };
            return reply
                .status(HttpCode.INTERNAL_SERVER_ERROR)
                .send(response);
        });
    }
    async init() {
        this.logger.info('Application initialization…');
        await this.initServe();
        await this.initMiddlewares();
        this.registerPlugins();
        this.initValidationCompiler();
        this.initErrorHandler();
        this.initRoutes();
        this.database.connect();
        await this.app
            .listen({
            port: this.config.ENV.APP.PORT,
        })
            .catch((error) => {
            this.logger.error(error.message, {
                cause: error.cause,
                stack: error.stack,
            });
        });
        this.logger.info(`Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${this.config.ENV.APP.ENVIRONMENT}.`);
    }
}
export { BaseServerApp };
