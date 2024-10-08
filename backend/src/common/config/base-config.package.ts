import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { type Config, type EnvironmentSchema } from './types/types.js';

class BaseConfig implements Config {
    private logger: Logger;

    public ENV: EnvironmentSchema;

    public constructor(logger: Logger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => this.logger.info(message),
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
                OPEN_AI_KEY: {
                    doc: 'Key for Open Ai',
                    format: String,
                    env: 'OPEN_AI_KEY',
                    default: null,
                },
                SESSION_KEY: {
                    doc: 'Key for sessions',
                    format: String,
                    env: 'SESSION_KEY',
                    default: null,
                },
                ORIGIN: {
                    doc: 'Origin',
                    format: String,
                    env: 'ORIGIN',
                    default: null,
                },
            },
            DB: {
                CONNECTION_STRING: {
                    doc: 'Database connection string',
                    format: String,
                    env: 'DB_CONNECTION_STRING',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            TOKEN: {
                SECRET_KEY: {
                    doc: 'Secret key for token generation',
                    format: String,
                    env: 'SECRET_KEY',
                    default: null,
                },
                EXPIRATION_TIME: {
                    doc: 'Token expiration time',
                    format: String,
                    env: 'EXPIRATION_TIME',
                    default: null,
                },
            },
            AWS: {
                ACCESS_KEY_ID: {
                    doc: 'AWS access key id',
                    format: String,
                    env: 'AWS_ACCESS_KEY_ID',
                    default: null,
                },
                SECRET_ACCESS_KEY: {
                    doc: 'AWS secret access key',
                    format: String,
                    env: 'AWS_SECRET_ACCESS_KEY',
                    default: null,
                },
                S3: {
                    REGION: {
                        doc: 'AWS S3 region',
                        format: String,
                        env: 'AWS_S3_REGION',
                        default: null,
                    },
                    BUCKET_NAME: {
                        doc: 'AWS S3 bucket name',
                        format: String,
                        env: 'AWS_S3_BUCKET_NAME',
                        default: null,
                    },
                },
                CLOUDFRONT: {
                    DOMAIN_ID: {
                        doc: 'AWS CloudFront domain id',
                        format: String,
                        env: 'AWS_CLOUDFRONT_DOMAIN_ID',
                        default: null,
                    },
                    DOMAIN_ID_FOR_RENDERED_VIDEO: {
                        doc: 'AWS CloudFront domain id for rendered video',
                        format: String,
                        env: 'AWS_CLOUDFRONT_DOMAIN_ID_FOR_RENDERED_VIDEO',
                        default: null,
                    },
                },
            },
            AZURE: {
                SUBSCRIPTION_KEY: {
                    doc: 'Azure subscription key',
                    format: String,
                    env: 'AZURE_SUBSCRIPTION_KEY',
                    default: null,
                },
                SERVICE_REGION: {
                    doc: 'Azure service region',
                    format: String,
                    env: 'AZURE_SERVICE_REGION',
                    default: null,
                },
                SERVICE_ENDPOINT: {
                    doc: 'Azure service endpoint',
                    format: String,
                    env: 'AZURE_SERVICE_ENDPOINT',
                    default: null,
                },
            },
            REMOTION: {
                LAMBDA_FUNCTION_NAME: {
                    doc: 'Remotion lambda function name',
                    format: String,
                    env: 'REMOTION_LAMBDA_FUNCTION_NAME',
                    default: null,
                },
                SERVE_URL: {
                    doc: 'URL under which a Remotion Bundle is hosted.',
                    format: String,
                    env: 'REMOTION_SERVE_URL',
                    default: null,
                },
                BUCKET_NAME: {
                    doc: 'Remotion bucket name',
                    format: String,
                    env: 'REMOTION_BUCKET_NAME',
                    default: null,
                },
            },
        });
    }
}

export { BaseConfig };
