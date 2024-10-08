import { NotificationEntity } from '~/bundles/notifications/notification.entity.js';
import { type NotificationRepository } from '~/bundles/notifications/notification.repository.js';
import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { NotificationValidationMessage } from './enums/enums.js';
import {
    type CreateNotificationRequestDto,
    type NotificationGetAllItemResponseDto,
    type NotificationGetAllResponseDto,
    type UpdateNotificationRequestDto,
} from './types/types.js';

class NotificationService implements Service {
    private notificationRepository: NotificationRepository;

    public constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public findById(): ReturnType<Service['findById']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<Service['findAll']> {
        return Promise.resolve({ items: [] });
    }

    public async findAllUnread(): Promise<NotificationGetAllResponseDto> {
        const items = await this.notificationRepository.findAllUnread();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateNotificationRequestDto,
    ): Promise<NotificationGetAllItemResponseDto> {
        const notification = await this.notificationRepository.create(
            NotificationEntity.initializeNew(payload),
        );

        return notification.toObject();
    }

    public async update(
        notificationId: string,
        payload: UpdateNotificationRequestDto,
    ): Promise<NotificationGetAllItemResponseDto> {
        const updatedNotification = await this.notificationRepository.update(
            notificationId,
            payload,
        );

        if (!updatedNotification) {
            throw new HttpError({
                message:
                    NotificationValidationMessage.NOTIFICATION_DOES_NOT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return updatedNotification.toObject();
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { NotificationService };
