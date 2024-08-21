import swaggerJsdoc from 'swagger-jsdoc';

import { type Config } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';

import {
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

class BaseServerAppApi implements ServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    private config: Config;

    public constructor(
        version: string,
        config: Config,
        ...handlers: ServerAppRouteParameters[]
    ) {
        this.version = version;
        this.config = config;
        this.routes = handlers.map((it) => ({
            ...it,
            path: `/api/${this.version}${it.path}`,
        }));
    }

    public generateDoc(): ReturnType<typeof swaggerJsdoc> {
        const isProduction =
            this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION;

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
