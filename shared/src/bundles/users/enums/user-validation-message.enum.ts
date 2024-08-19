const UserValidationMessage = {
    EMAIL_REQUIRE: 'Email is required',
    EMAIL_WRONG: 'Email is wrong',
    EMAIL_INVALID: 'Please enter a valid email',
    FIELD_REQUIRE: 'Please fill out this field',
    PASSWORD_LENGTH: 'Password must have from 6 to 12 characters',
    INVALID_DATA: 'Incorrect email or password. Please try again.',
    WRONG_CREDENTIALS: 'Email or password are incorrect',
} as const;

export { UserValidationMessage };
