const createVideoUrl = (jwtToken: string): string => {
    const baseUrl =
        import.meta.env['VITE_APP_NODE_ENV'] === 'production'
            ? 'http://bsa-2024-outreachvids-dev.eu-north-1.elasticbeanstalk.com/'
            : 'http://localhost:3000';

    return `${baseUrl}/preview/${jwtToken}`;
};

export { createVideoUrl };
