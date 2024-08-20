const UserValidationMessage = {
    FIELD_IS_REQUIRE: 'Please fill out this field',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_LENGTH: 'Password must have from 6 to 12 characters',
    PASS_DONT_MATCH: 'Passwords must be identical',
    USER_IS_NOT_AVAILABLE:
        'User with this email already exists. Log in if it is you',
} as const;

export { UserValidationMessage };
