import { z } from 'zod';

import {
    TextGenerationValidationMessage,
    TextGenerationValidationRule,
} from '../enums/enums.js';

type GenerateTextRequestValidationDto = {
    message: z.ZodString;
};

const textGeneration = z
    .object<GenerateTextRequestValidationDto>({
        message: z
            .string({
                required_error:
                    TextGenerationValidationMessage.MESSAGE_REQUIRED,
            })
            .trim()
            .min(TextGenerationValidationRule.MESSAGE_MINIMUM_LENGTH, {
                message: TextGenerationValidationMessage.MESSAGE_LENGTH,
            }),
    })
    .required();

export { textGeneration };
