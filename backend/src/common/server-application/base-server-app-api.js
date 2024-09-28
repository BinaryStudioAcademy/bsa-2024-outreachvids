import swaggerJsdoc from 'swagger-jsdoc';
import { AppEnvironment } from '~/common/enums/enums.js';
class BaseServerAppApi {
    version;
    routes;
    config;
    constructor(version, config, ...handlers) {
        this.version = version;
        this.config = config;
        this.routes = handlers.map((it) => ({
            ...it,
            path: `/api/${this.version}${it.path}`,
        }));
    }
    generateDoc() {
        const isProduction = this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;
        const controllerExtension = isProduction ? 'js' : 'ts';
        return swaggerJsdoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'OutreachVids API documentation',
                    version: `${this.version}.0.0`,
                },
                components: {
                    schemas: {
                        Error: {
                            type: 'object',
                            properties: {
                                errorType: {
                                    type: 'string',
                                    enum: ['COMMON', 'VALIDATION'],
                                },
                                message: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            apis: [`src/bundles/**/*.controller.${controllerExtension}`],
        });
    }
}
export { BaseServerAppApi };
