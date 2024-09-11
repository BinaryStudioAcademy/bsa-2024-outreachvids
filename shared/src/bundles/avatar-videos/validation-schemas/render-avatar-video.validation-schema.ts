import { z } from 'zod';

import { AvatarVideoValidationMessage } from '../enum/enums.js';

type GenerateAvatarVideoRequestValidationDto = {
    avatarName: z.ZodString;
    avatarStyle: z.ZodString;
    text: z.ZodString;
    voice: z.ZodString;
};

const renderAvatarVideo = z
    .object<GenerateAvatarVideoRequestValidationDto>({
        text: z.string().trim().min(1, {
            message: AvatarVideoValidationMessage.TEXT_REQUIRED,
        }),
        avatarName: z.string().trim().min(1, {
            message: AvatarVideoValidationMessage.AVATAR_NAME_REQUIRED,
        }),
        avatarStyle: z.string().trim().min(1, {
            message: AvatarVideoValidationMessage.AVATAR_STYLE_REQUIRED,
        }),
        voice: z.string().trim().min(1, {
            message: AvatarVideoValidationMessage.VOICE_NAME_REQUIRED,
        }),
    })
    .required()
    .refine(
        ({ voice }) => {
            const splittedVoiceName = voice.split('-');

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
            message: AvatarVideoValidationMessage.VOICE_NAME_INVALID,
            path: ['voice'],
        },
    );

export { renderAvatarVideo };
