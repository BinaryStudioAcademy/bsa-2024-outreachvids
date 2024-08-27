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
                },
            },
        });
    }
}

export { BaseConfig };
