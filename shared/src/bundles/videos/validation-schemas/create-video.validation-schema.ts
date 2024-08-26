import { z } from 'zod';

import { VideoValidationMessage } from '../enums/enums.js';

type CreateVideoValidationDto = {
    userId: z.ZodString;
    name: z.ZodString;
    url: z.ZodString;
};

const createVideo = z
    .object<CreateVideoValidationDto>({
        userId: z
            .string({ required_error: VideoValidationMessage.USER_ID_REQUIRE })
            .trim()
            .uuid({ message: VideoValidationMessage.UUID_WRONG }),
        name: z
            .string({ required_error: VideoValidationMessage.NAME_REQUIRE })
            .trim()
            .min(1, {
                message: VideoValidationMessage.NAME_LENGTH,
            }),
        url: z
            .string({ required_error: VideoValidationMessage.URL_REQUIRE })
            .trim()
            .url({ message: VideoValidationMessage.URL_WRONG }),
    })
    .required();

export { createVideo };
