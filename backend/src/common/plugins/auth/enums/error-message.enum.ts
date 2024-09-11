const ErrorMessage = {
    MISSING_TOKEN: 'You are not logged in',
    INVALID_TOKEN: 'Token is no longer valid. Please log in again.',
    MISSING_USER: 'User with this id does not exist.',
    URL_NOT_FOUND: 'Not found, route is not available or incorrectly',
} as const;

export { ErrorMessage };
