import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    email: z.ZodString;
    password: z.ZodString;
};

const userSignUp = z
    .object<UserSignUpRequestValidationDto>({
        email: z
            .string()
            .trim()
            .min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
                message: UserValidationMessage.EMAIL_REQUIRE,
            })
            .email({
                message: UserValidationMessage.EMAIL_WRONG,
            }),
        password: z.string().trim(),
    })
    .required();

export { userSignUp };
