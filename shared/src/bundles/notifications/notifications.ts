export {
    NotificationsApiPath,
    NotificationValidationMessage,
} from './enums/enums.js';
export {
    type CreateNotificationRequestDto,
    type NotificationGetAllItemResponseDto,
    type NotificationGetAllResponseDto,
    type NotificationGetOneRequestDto,
    type NotificationType,
    type UpdateNotificationRequestDto,
} from './types/types.js';
export {
    createNotification as createNotificationValidationSchema,
    updateNotification as updateNotificationValidationSchema,
} from './validation-schemas/validation-schemas.js';
