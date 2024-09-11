import { z } from 'zod';

import { NotificationTypeValue } from '../enums/enums.js';

type CreateNotificationValidationDto = {
    userId: z.ZodString;
    isRead: z.ZodBoolean;
    type: z.ZodNativeEnum<typeof NotificationTypeValue>;
};

const createNotification = z
    .object<CreateNotificationValidationDto>({
        userId: z.string().trim().uuid(),
        isRead: z.boolean(),
        type: z.nativeEnum(NotificationTypeValue),
    })
    .required();

export { createNotification };
