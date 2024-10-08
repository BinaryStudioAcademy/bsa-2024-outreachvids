import { EMPTY_VALUE } from 'shared';
import { z } from 'zod';

import { VideoValidationMessage } from '../enums/enums.js';

type SceneAvatarValidation = {
    id: z.ZodString;
    name: z.ZodString;
    style: z.ZodString;
    url: z.ZodString;
};

type SceneBackground = {
    color: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
};

type SceneValidation = {
    id: z.ZodString;
    duration: z.ZodNumber;
    avatar: typeof avatarSchema;
    background: z.ZodOptional<typeof backgroundSchema>;
};

type ScriptValidation = {
    duration: z.ZodNumber;
    text: z.ZodString;
    voiceName: z.ZodString;
};

type CompositionSchema = {
    scenes: z.ZodArray<typeof sceneSchema>;
    scripts: z.ZodArray<typeof scriptSchema>;
    videoOrientation: z.ZodEnum<['landscape', 'portrait']>;
};

type GenerateAvatarVideoRequestValidationDto = {
    name: z.ZodString;
    composition: typeof compositionSchema;
    url?: z.ZodOptional<z.ZodString>;
};

const avatarSchema = z.object<SceneAvatarValidation>({
    id: z.string().uuid({
        message: VideoValidationMessage.AVATAR_ID_REQUIRED,
    }),
    name: z.string().trim().min(1, {
        message: VideoValidationMessage.AVATAR_NAME_REQUIRED,
    }),
    style: z.string().trim().min(1, {
        message: VideoValidationMessage.AVATAR_STYLE_REQUIRED,
    }),
    url: z.string().url({
        message: VideoValidationMessage.AVATAR_IMG_REQUIRED,
    }),
});

const backgroundSchema = z.object<SceneBackground>({
    color: z.string().min(1).optional(),
    url: z.string().url().optional(),
});

const sceneSchema = z.object<SceneValidation>({
    duration: z.number().min(1, {
        message: VideoValidationMessage.DURATION_REQUIRED,
    }),
    id: z.string().uuid({
        message: VideoValidationMessage.ID_REQUIRED,
    }),
    avatar: avatarSchema,
    background: backgroundSchema.optional(),
});

const scriptSchema = z
    .object<ScriptValidation>({
        duration: z.number().min(1, {
            message: VideoValidationMessage.DURATION_REQUIRED,
        }),
        text: z.string().trim().min(1, {
            message: VideoValidationMessage.TEXT_REQUIRED,
        }),
        voiceName: z.string().trim().min(1, {
            message: VideoValidationMessage.VOICE_NAME_REQUIRED,
        }),
    })
    .required()
    .refine(
        ({ voiceName }) => {
            const splittedVoiceName = voiceName.split('-');

            if (splittedVoiceName.length !== 3) {
                return false;
            }

            if (splittedVoiceName[2]?.length === EMPTY_VALUE) {
                return false;
            }

            const locales = splittedVoiceName.slice(0, 2);

            return locales.every((locale) => locale.length === 2);
        },
        {
            message: VideoValidationMessage.VOICE_NAME_INVALID,
            path: ['voiceName'],
        },
    );

const compositionSchema = z.object<CompositionSchema>({
    scenes: z.array(sceneSchema).min(1, {
        message: VideoValidationMessage.SCENES_REQUIRED,
    }),
    scripts: z.array(scriptSchema).min(1, {
        message: VideoValidationMessage.SCRIPTS_REQUIRED,
    }),
    videoOrientation: z.enum(['landscape', 'portrait']),
});

const createVideo = z.object<GenerateAvatarVideoRequestValidationDto>({
    name: z.string().trim().min(1, {
        message: VideoValidationMessage.VIDEO_NAME_REQUIRED,
    }),
    url: z
        .string()
        .trim()
        .min(1, {
            message: VideoValidationMessage.VIDEO_NAME_REQUIRED,
        })
        .optional(),
    composition: compositionSchema,
});

export { createVideo };
