import { EMPTY_LENGTH } from 'shared';
import { z } from 'zod';

import { SpeechValidationMessage } from '../enums/enums.js';

type GenerateSpeechRequestValidationDto = {
    scriptId: z.ZodString;
    text: z.ZodString;
    voiceName: z.ZodString;
};

const generateSpeech = z
    .object<GenerateSpeechRequestValidationDto>({
        scriptId: z
            .string()
            .trim()
            .min(1, {
                message: SpeechValidationMessage.SCRIPT_ID_REQUIRED,
            })
            .uuid({ message: SpeechValidationMessage.SCRIPT_ID_INVALID }),
        text: z.string().trim().min(1, {
            message: SpeechValidationMessage.TEXT_REQUIRED,
        }),
        voiceName: z.string().trim().min(1, {
            message: SpeechValidationMessage.VOICE_NAME_REQUIRED,
        }),
    })
    .required()
    .refine(
        ({ voiceName }) => {
            const splittedVoiceName = voiceName.split('-');

            if (splittedVoiceName.length !== 3) {
                return false;
            }

            if (splittedVoiceName[2]?.length === EMPTY_LENGTH) {
                return false;
            }

            const locales = splittedVoiceName.slice(0, 2);

            return locales.every((locale) => locale.length === 2);
        },
        {
            message: SpeechValidationMessage.VOICE_NAME_INVALID,
            path: ['voiceName'],
        },
    );

export { generateSpeech };
