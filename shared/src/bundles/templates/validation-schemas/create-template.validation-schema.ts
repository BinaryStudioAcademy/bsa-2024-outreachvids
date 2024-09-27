import { compositionValidationSchema } from 'shared';
import { z } from 'zod';

import { TemplateValidationErrorMessage } from '../enums/enums.js';

type CreateTemplateRequestValidationDto = {
    name: z.ZodString;
    composition: typeof compositionValidationSchema;
};

const createTemplate = z.object<CreateTemplateRequestValidationDto>({
    name: z.string().trim().min(1, {
        message: TemplateValidationErrorMessage.TEMPLATE_NAME_IS_REQUIRED,
    }),
    composition: compositionValidationSchema,
});

export { createTemplate };
