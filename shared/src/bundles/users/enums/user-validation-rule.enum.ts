const UserValidationRule = {
    EMAIL_MINIMUM_LENGTH: 6,
    EMAIL_MAXIMUM_LENGTH: 320,
    PASSWORD_MINIMUM_LENGTH: 6,
    PASSWORD_MAXIMUM_LENGTH: 12,
} as const;

export { UserValidationRule };
