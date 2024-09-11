import { z } from 'zod';

import { parametersValidationMessage } from '../enums/parameters-validation-message.enum.js';

type idParametersValidationSchema = {
    id: z.ZodString;
};

const idParameters = z
    .object<idParametersValidationSchema>({
        id: z
            .string()
            .trim()
            .uuid({ message: parametersValidationMessage.INVALID_ID }),
    })
    .required();

export { idParameters };
