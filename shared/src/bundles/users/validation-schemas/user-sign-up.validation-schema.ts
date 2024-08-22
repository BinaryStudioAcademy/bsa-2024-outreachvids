import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    fullName: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
};

const userSignUp = z
    .object<UserSignUpRequestValidationDto>({
        fullName: z
            .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
            .trim()
            .refine(
                (value) =>
                    value.split(/\s+/).length >= 2,
                {
                    message: UserValidationMessage.NAME_MIN_TWO_WORDS,
                },
            ),
        email: z
            .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
            .trim()
            .min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
                message: UserValidationMessage.EMAIL_WRONG,
            })
            .max(UserValidationRule.EMAIL_MAXIMUM_LENGTH, {
                message: UserValidationMessage.EMAIL_WRONG,
            })
            .email({
                message: UserValidationMessage.EMAIL_WRONG,
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
        confirmPassword: z
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

export { userSignUp };
