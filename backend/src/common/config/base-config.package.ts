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
            AZURE: {
                COGNITIVE_SERVICE_KEY: {
                    doc: 'Azure Cognitive Service API key',
                    format: String,
                    env: 'AZURE_COGNITIVE_SERVICE_KEY',
                    default: null,
                },
                COGNITIVE_SERVICE_ENDPOINT: {
                    doc: 'Azure Cognitive Service endpoint',
                    format: String,
                    env: 'AZURE_COGNITIVE_SERVICE_ENDPOINT',
                    default: null,
                },
                COGNITIVE_SERVICE_REGION: {
                    doc: 'Azure Cognitive Service region',
                    format: String,
                    env: 'AZURE_COGNITIVE_SERVICE_REGION',
                    default: null,
                },
                ICE_URL: {
                    doc: 'Azure Cognitive url to get avatar',
                    format: String,
                    env: 'ICE_URL',
                    default: null,
                },
                ICE_USERNAME: {
                    doc: 'Azure Cognitive username',
                    format: String,
                    env: 'ICE_USERNAME',
                    default: null,
                },
                ICE_CREDENTIALS: {
                    doc: 'Azure Cognitive Service credentials',
                    format: String,
                    env: 'ICE_CREDENTIALS',
                    default: null,
                },
            },
        });
    }
}

export { BaseConfig };
