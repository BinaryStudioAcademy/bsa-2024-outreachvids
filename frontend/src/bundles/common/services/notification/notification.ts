import { createStandaloneToast } from '@chakra-ui/react';

import { theme } from '~/framework/theme/theme.js';

import { NotificationService } from './notification.service.js';

const { toast } = createStandaloneToast({ theme: theme });

const notificationService = new NotificationService({ toast });

export { NotificationService } from './notification.service.js';
export { notificationService };
