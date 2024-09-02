import { type ValueOf } from 'src/types/types.js';

import { type NotificationTypeValue } from '../enums/enums.js';

type NotificationType = ValueOf<typeof NotificationTypeValue>;

export { type NotificationType };
