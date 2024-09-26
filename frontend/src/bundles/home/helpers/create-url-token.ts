import { config } from '~/framework/config/config.js';

const createVideoUrl = (jwtToken: string): string => {
    const baseUrl = config.ENV.DEPLOYMENT.PUBLIC_URL;

    return `${baseUrl}/preview/${jwtToken}`;
};

export { createVideoUrl };
