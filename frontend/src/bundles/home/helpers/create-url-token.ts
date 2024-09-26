import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { config } from '~/framework/config/config.js';

const createVideoUrl = (jwtToken: string): string => {
    const baseUrl =
        config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION
            ? 'http://bsa-2024-outreachvids-dev.eu-north-1.elasticbeanstalk.com'
            : 'http://localhost:3000';

    return `${baseUrl}/preview/${jwtToken}`;
};

export { createVideoUrl };
