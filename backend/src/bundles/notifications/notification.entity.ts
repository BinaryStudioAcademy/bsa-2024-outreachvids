import { type Entity } from '~/common/types/types.js';

import { type NotificationType } from './types/types.js';

class NotificationEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'type': NotificationType;

    private 'isRead': boolean;

    private constructor({
        id,
        userId,
        type,
        isRead,
    }: {
        id: string | null;
        userId: string;
        type: NotificationType;
        isRead: boolean;
    }) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.isRead = isRead;
    }

    public static initialize({
        id,
        userId,
        type,
        isRead,
    }: {
        id: string;
        userId: string;
        type: NotificationType;
        isRead: boolean;
    }): NotificationEntity {
        return new NotificationEntity({
            id,
            userId,
            type,
            isRead,
        });
    }

    public static initializeNew({
        userId,
        type,
        isRead,
    }: {
        userId: string;
        type: NotificationType;
        isRead: boolean;
    }): NotificationEntity {
        return new NotificationEntity({
            id: null,
            userId,
            type,
            isRead,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        type: NotificationType;
        isRead: boolean;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            type: this.type,
            isRead: this.isRead,
        };
    }

    public toNewObject(): {
        userId: string;
        type: NotificationType;
        isRead: boolean;
    } {
        return {
            userId: this.userId,
            type: this.type,
            isRead: this.isRead,
        };
    }
}

export { NotificationEntity };
