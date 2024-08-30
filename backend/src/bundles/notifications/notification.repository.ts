import { NotificationEntity } from '~/bundles/notifications/notification.entity.js';
import { type NotificationModel } from '~/bundles/notifications/notification.model.js';
import { type Repository } from '~/common/types/types.js';

class NotificationRepository implements Repository {
    private notificationModel: typeof NotificationModel;

    public constructor(notificationModel: typeof NotificationModel) {
        this.notificationModel = notificationModel;
    }

    public async find(
        notificationId: string,
    ): Promise<NotificationEntity | null> {
        const notification = await this.notificationModel
            .query()
            .findById(notificationId)
            .execute();

        return notification
            ? NotificationEntity.initialize(notification)
            : null;
    }

    public async findAll(): Promise<NotificationEntity[]> {
        const notifications = await this.notificationModel.query().execute();

        return notifications.map((it) => NotificationEntity.initialize(it));
    }

    public async create(
        entity: NotificationEntity,
    ): Promise<NotificationEntity> {
        const { type, isRead } = entity.toNewObject();

        const item = await this.notificationModel
            .query()
            .insert({
                type,
                isRead,
            })
            .returning('*')
            .execute();

        return NotificationEntity.initialize(item);
    }

    public update(): Promise<unknown> {
        return Promise.resolve(null);
    }

    public delete(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export { NotificationRepository };
