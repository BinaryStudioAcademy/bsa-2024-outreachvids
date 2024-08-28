import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    fullName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
};

const userSignUp = z
    .object<UserSignUpRequestValidationDto>({
        fullName: z
            .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
            .trim(),
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
    .required()
    .refine((data) => data.fullName.split(/\s+/).length >= 2, {
        message: UserValidationMessage.FULL_NAME_INVALID,
        path: ['name'],
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: UserValidationMessage.PASS_DONT_MATCH,
        path: ['confirmPassword'],
    });

export { userSignUp };
