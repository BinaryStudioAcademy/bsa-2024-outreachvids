import { type Entity } from '~/common/types/types.js';

class NotificationEntity implements Entity {
    private 'id': string | null;

    private 'type': 'render';

    private 'isRead': boolean;

    private constructor({
        id,
        type,
        isRead,
    }: {
        id: string | null;
        type: 'render';
        isRead: boolean;
    }) {
        this.id = id;
        this.type = type;
        this.isRead = isRead;
    }

    public static initialize({
        id,
        type,
        isRead,
    }: {
        id: string;
        type: 'render';
        isRead: boolean;
    }): NotificationEntity {
        return new NotificationEntity({
            id,
            type,
            isRead,
        });
    }

    public static initializeNew({
        type,
        isRead,
    }: {
        type: 'render';
        isRead: boolean;
    }): NotificationEntity {
        return new NotificationEntity({
            id: null,
            type,
            isRead,
        });
    }

    public toObject(): {
        id: string;
        type: 'render';
        isRead: boolean;
    } {
        return {
            id: this.id as string,
            type: this.type,
            isRead: this.isRead,
        };
    }

    public toNewObject(): {
        type: 'render';
        isRead: boolean;
    } {
        return {
            type: this.type,
            isRead: this.isRead,
        };
    }
}

export { NotificationEntity };
