import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { AppEnvironment } from '~/common/enums/enums.js';
import { DatabaseTableName } from './enums/enums.js';
class BaseDatabase {
    appConfig;
    logger;
    constructor(config, logger) {
        this.appConfig = config;
        this.logger = logger;
    }
    connect() {
        this.logger.info('Establish DB connection...');
        Model.knex(Knex(this.environmentConfig));
    }
    get environmentsConfig() {
        return {
            [AppEnvironment.DEVELOPMENT]: this.initialConfig,
            [AppEnvironment.PRODUCTION]: this.initialConfig,
        };
    }
    get initialConfig() {
        return {
            client: this.appConfig.ENV.DB.DIALECT,
            connection: this.appConfig.ENV.DB.CONNECTION_STRING,
            pool: {
                min: this.appConfig.ENV.DB.POOL_MIN,
                max: this.appConfig.ENV.DB.POOL_MAX,
            },
            migrations: {
                directory: 'src/migrations',
                tableName: DatabaseTableName.MIGRATIONS,
            },
            debug: false,
            ...knexSnakeCaseMappers({
                underscoreBetweenUppercaseLetters: true,
            }),
        };
    }
    get environmentConfig() {
        return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
    }
}
export { BaseDatabase };
export { DatabaseTableName } from './enums/enums.js';
