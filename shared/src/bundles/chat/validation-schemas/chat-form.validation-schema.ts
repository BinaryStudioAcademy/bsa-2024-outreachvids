import { z } from 'zod';

import { ChatValidationMessage } from '../enums/enums.js';

type ChatFormRequestValidationDto = {
    message: z.ZodString;
};

const chatForm = z
    .object<ChatFormRequestValidationDto>({
        message: z
            .string({ required_error: ChatValidationMessage.FIELD_REQUIRE })
            .trim(),
    })
    .required();

export { chatForm };
