import { NotificationEntity } from '~/bundles/notifications/notification.entity.js';
import { type NotificationModel } from '~/bundles/notifications/notification.model.js';
import { type Repository } from '~/common/types/types.js';

import { type UpdateNotificationRequestDto } from './types/types.js';

class NotificationRepository implements Repository {
    private notificationModel: typeof NotificationModel;

    public constructor(notificationModel: typeof NotificationModel) {
        this.notificationModel = notificationModel;
    }

    public findById(): ReturnType<Repository['findById']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<Repository['findAll']> {
        return Promise.resolve([]);
    }

    public async findAllUnread(): Promise<NotificationEntity[]> {
        const notifications = await this.notificationModel
            .query()
            .where('isRead', false)
            .execute();

        return notifications.map((notification) =>
            NotificationEntity.initialize(notification),
        );
    }

    public async create(
        entity: NotificationEntity,
    ): Promise<NotificationEntity> {
        const { type, isRead, userId } = entity.toNewObject();

        const item = await this.notificationModel
            .query()
            .insert({
                type,
                isRead,
                userId,
            })
            .returning('*')
            .execute();

        return NotificationEntity.initialize(item);
    }

    public async update(
        notificationId: string,
        payload: UpdateNotificationRequestDto,
    ): Promise<NotificationEntity | null> {
        const updatedItem = await this.notificationModel
            .query()
            .patchAndFetchById(notificationId, payload)
            .execute();

        return updatedItem ? NotificationEntity.initialize(updatedItem) : null;
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { NotificationRepository };
