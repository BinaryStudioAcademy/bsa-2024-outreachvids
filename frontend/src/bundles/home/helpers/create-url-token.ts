const createVideoUrl = (jwtToken: string): string => {
    const baseUrl = 'http://localhost:3000';
    return `${baseUrl}/preview/${jwtToken}`;
};

export { createVideoUrl };
