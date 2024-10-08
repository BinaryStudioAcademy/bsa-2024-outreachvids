import { type AppEnvironment } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    API: {
        ORIGIN_URL: string;
        SOCKET_ORIGIN_URL: string;
    };
    DEPLOYMENT: {
        PUBLIC_URL: string;
    };
};

export { type EnvironmentSchema };
