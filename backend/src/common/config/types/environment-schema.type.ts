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
    AZURE: {
        COGNITIVE_SERVICE_KEY: string;
        COGNITIVE_SERVICE_ENDPOINT: string;
        COGNITIVE_SERVICE_REGION: string;
        ICE_URL: string;
        ICE_USERNAME: string;
        ICE_CREDENTIALS: string;
    };
};

export { type EnvironmentSchema };
