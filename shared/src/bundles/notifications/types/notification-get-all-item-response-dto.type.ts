import { type NotificationType } from './types.js';

type NotificationGetAllItemResponseDto = {
    id: string;
    userId: string;
    isRead: boolean;
    type: NotificationType;
};

export { type NotificationGetAllItemResponseDto };
