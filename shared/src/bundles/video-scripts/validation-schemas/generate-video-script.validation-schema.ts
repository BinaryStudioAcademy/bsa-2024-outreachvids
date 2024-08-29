import { z } from 'zod';

import { VideoScriptValidationMessage } from '../enums/enums.js';

type generateVideoScriptValidationDto = {
    topic: z.ZodString;
    language: z.ZodString;
};

const generateVideoScript = z.object<generateVideoScriptValidationDto>({
    topic: z.string().trim().min(1, {
        message: VideoScriptValidationMessage.TOPIC_REQUIRED,
    }),
    language: z.string().trim().min(1, {
        message: VideoScriptValidationMessage.LANGUAGE_REQUIRED,
    }),
});

export { generateVideoScript };
