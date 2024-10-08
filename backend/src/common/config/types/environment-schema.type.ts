import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        OPEN_AI_KEY: string;
        SESSION_KEY: string;
        ORIGIN: string;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    TOKEN: {
        SECRET_KEY: string;
        EXPIRATION_TIME: string;
    };
    AWS: {
        ACCESS_KEY_ID: string;
        SECRET_ACCESS_KEY: string;
        S3: {
            REGION: string;
            BUCKET_NAME: string;
        };
        CLOUDFRONT: {
            DOMAIN_ID: string;
            DOMAIN_ID_FOR_RENDERED_VIDEO: string;
        };
    };
    AZURE: {
        SUBSCRIPTION_KEY: string;
        SERVICE_REGION: string;
        SERVICE_ENDPOINT: string;
    };
    REMOTION: {
        SERVE_URL: string;
        LAMBDA_FUNCTION_NAME: string;
        BUCKET_NAME: string;
    };
};

export { type EnvironmentSchema };
