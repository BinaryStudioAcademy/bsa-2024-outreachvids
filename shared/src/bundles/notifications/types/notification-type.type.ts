import { type ValueOf } from 'shared';

import { type NotificationTypeValue } from '../enums/enums.js';

type NotificationType = ValueOf<typeof NotificationTypeValue>;

export { type NotificationType };
