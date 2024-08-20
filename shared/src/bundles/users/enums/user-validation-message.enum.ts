const UserValidationMessage = {
    FIELD_IS_REQUIRE: 'Please fill out this field',
    EMAIL_WRONG: 'Please enter a valid email',
    PASS_DONT_MATCH: 'Passwords must be identical',
    PASS_WRONG: 'Password must have from 6 to 12 characters',
    USER_IS_NOT_AVAILABLE:
        'User with this email already exists. Log in if it is you',
} as const;

export { UserValidationMessage };
