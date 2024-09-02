const UserValidationRule = {
    EMAIL_MINIMUM_LENGTH: 6,
    EMAIL_MAXIMUM_LENGTH: 320,
    PASSWORD_MINIMUM_LENGTH: 6,
    PASSWORD_MAXIMUM_LENGTH: 12,
    FULL_NAME_MINIMUM_WORD_LENGTH: 2,
} as const;

export { UserValidationRule };
