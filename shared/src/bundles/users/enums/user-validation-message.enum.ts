const UserValidationMessage = {
    EMAIL_WRONG: 'Please enter a valid email',
    FIELD_REQUIRE: 'Please fill out this field',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_LENGTH: 'Password must have from 6 to 12 characters',
    INVALID_DATA: 'Incorrect email or password. Please try again.',
    WRONG_CREDENTIALS: 'Email or password are incorrect',
    NAME_MIN_TWO_WORDS: 'Name must contain at least two words',
} as const;

export { UserValidationMessage };
