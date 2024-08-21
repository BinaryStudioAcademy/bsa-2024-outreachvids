import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignInRequestValidationDto = {
    email: z.ZodString;
    password: z.ZodString;
};

const userSignIn = z
    .object<UserSignInRequestValidationDto>({
        email: z
            .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
            .trim()
            .min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
                message: UserValidationMessage.EMAIL_INVALID,
            })
            .max(UserValidationRule.EMAIL_MAXIMUM_LENGTH, {
                message: UserValidationMessage.EMAIL_INVALID,
            })
            .email({
                message: UserValidationMessage.EMAIL_INVALID,
            }),
        password: z
            .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
            .trim()
            .min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
                message: UserValidationMessage.PASSWORD_LENGTH,
            })
            .max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
                message: UserValidationMessage.PASSWORD_LENGTH,
            }),
    })
    .required();

export { userSignIn };
