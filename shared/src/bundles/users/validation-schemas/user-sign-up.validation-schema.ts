import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
};

const userSignUp = z
    .object<UserSignUpRequestValidationDto>({
        name: z
            .string()
            .trim(),
        email: z
            .string()
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
            .string()
            .trim()
            .min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
                message: UserValidationMessage.PASS_WRONG,
            })
            .max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
                message: UserValidationMessage.PASS_WRONG,
            }),
        confirmPassword: z
            .string()
            .trim()
            .min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
                message: UserValidationMessage.PASS_WRONG,
            })
            .max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
                message: UserValidationMessage.PASS_WRONG,
            }),
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
        message: UserValidationMessage.PASS_DONT_MATCH,
        path: ['confirmPassword'],
    });

export { userSignUp };
