import { z } from 'zod';

type UpdateNotificationValidationDto = {
    isRead: z.ZodOptional<z.ZodBoolean>;
};

const updateNotification = z.object<UpdateNotificationValidationDto>({
    isRead: z.boolean().optional(),
});

export { updateNotification };
