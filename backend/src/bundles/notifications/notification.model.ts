import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class NotificationModel extends AbstractModel {
    public 'type': 'render';

    public 'isRead': boolean;

    public static override get tableName(): string {
        return DatabaseTableName.NOTIFICATIONS;
    }
}

export { NotificationModel };
