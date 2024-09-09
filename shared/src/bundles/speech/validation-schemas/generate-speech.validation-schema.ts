import { z } from 'zod';

import { SpeechValidationMessage } from '../enums/enums.js';

type GenerateSpeechRequestValidationDto = {
    text: z.ZodString;
    voiceName: z.ZodString;
};

const generateSpeech = z
    .object<GenerateSpeechRequestValidationDto>({
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

            if (splittedVoiceName[2]?.length === 0) {
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
