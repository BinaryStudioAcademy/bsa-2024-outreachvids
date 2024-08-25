import { z } from 'zod';

type CreateVideoValidationDto = {
    userId: z.ZodString;
    name: z.ZodString;
    url: z.ZodString;
};

const createVideo = z
    .object<CreateVideoValidationDto>({
        userId: z
            .string({ required_error: 'User id is required' })
            .trim()
            .uuid({ message: 'Invalid UUID' }),
        name: z
            .string({ required_error: 'The video name is required' })
            .trim()
            .min(1, {
                message: 'The video name should have at least 1 character',
            }),
        url: z
            .string({ required_error: 'The video url is required' })
            .trim()
            .url({ message: 'Invalid url' }),
    })
    .required();

export { createVideo };
