import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type NotificationType } from './types/types.js';

class NotificationModel extends AbstractModel {
    public 'userId': string;

    public 'type': NotificationType;

    public 'isRead': boolean;

    public static override get tableName(): string {
        return DatabaseTableName.NOTIFICATIONS;
    }
}

export { NotificationModel };
