import { type NotificationType } from './types.js';

type CreateNotificationRequestDto = {
    userId: string;
    isRead: boolean;
    type: NotificationType;
};

export { type CreateNotificationRequestDto };
