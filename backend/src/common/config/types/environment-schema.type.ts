import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    AWS: {
        ACCESS_KEY_ID: string;
        SECRET_ACCESS_KEY: string;
        S3: {
            REGION: string;
            BUCKET_NAME: string;
        };
        CLOUDFRONT: {
            DISTRIBUTION_ID: string;
        };
    };
};

export { type EnvironmentSchema };
