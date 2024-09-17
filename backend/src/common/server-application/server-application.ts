import { authController } from '~/bundles/auth/auth.js';
import { avatarVideoController } from '~/bundles/avatar-videos/avatar-videos.js';
import { avatarController } from '~/bundles/avatars/avatars.js';
import { chatController } from '~/bundles/chat/chat.js';
import { notificationController } from '~/bundles/notifications/notifications.js';
import { speechController } from '~/bundles/speech/speech.js';
import { userController } from '~/bundles/users/users.js';
import { videoController } from '~/bundles/videos/videos.js';
import { config } from '~/common/config/config.js';
import { database } from '~/common/database/database.js';
import { logger } from '~/common/logger/logger.js';

import { BaseServerApp } from './base-server-app.js';
import { BaseServerAppApi } from './base-server-app-api.js';

const apiV1 = new BaseServerAppApi(
    'v1',
    config,
    ...avatarController.routes,
    ...authController.routes,
    ...userController.routes,
    ...videoController.routes,
    ...notificationController.routes,
    ...chatController.routes,
    ...speechController.routes,
    ...avatarVideoController.routes,
);

const serverApp = new BaseServerApp({
    config,
    logger,
    database,
    apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './types/types.js';
