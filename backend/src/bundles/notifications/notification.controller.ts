import { type NotificationService } from '~/bundles/notifications/notification.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import { idParametersValidationSchema } from '~/common/validation-schemas/validation-schemas.js';

import { NotificationsApiPath } from './enums/enums.js';
import {
    type CreateNotificationRequestDto,
    type NotificationGetOneRequestDto,
    type UpdateNotificationRequestDto,
} from './types/types.js';
import {
    createNotificationValidationSchema,
    updateNotificationValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Notification:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          userId:
 *            type: string
 *            format: uuid
 *          isRead:
 *            type: boolean
 *            default: false
 *          type:
 *            type: string
 *            enum: [render]
 */

class NotificationController extends BaseController {
    private notificationService: NotificationService;

    public constructor(
        logger: Logger,
        notificationService: NotificationService,
    ) {
        super(logger, ApiPath.NOTIFICATIONS);

        this.notificationService = notificationService;

        this.addRoute({
            path: NotificationsApiPath.ROOT,
            method: HTTPMethod.GET,
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: NotificationsApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: createNotificationValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CreateNotificationRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: NotificationsApiPath.ID,
            method: HTTPMethod.PATCH,
            validation: {
                body: updateNotificationValidationSchema,
                params: idParametersValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: UpdateNotificationRequestDto;
                        params: NotificationGetOneRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/notifications/:
     *    get:
     *      description: Get all unread notifications
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  items:
     *                    type: array
     *                    description: A list of unread notification objects
     *                    items:
     *                      $ref: '#/components/schemas/Notification'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.notificationService.findAll(),
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/:
     *    post:
     *      description: Create new notification
     *      requestBody:
     *        description: Notification data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                userId:
     *                  type: string
     *                  format: uuid
     *                isRead:
     *                  type: boolean
     *                  default: false
     *                type:
     *                  type: string
     *                  enum: [render]
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Notification'
     */
    private async create(
        options: ApiHandlerOptions<{
            body: CreateNotificationRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.notificationService.create(options.body),
        };
    }

    /**
     * @swagger
     * /api/v1/notifications/{id}:
     *    patch:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The notification id
     *      description: Update notification by id
     *      requestBody:
     *        description: Notification data
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                userId:
     *                  type: string
     *                  format: uuid
     *                isRead:
     *                  type: boolean
     *                  default: false
     *                type:
     *                  type: string
     *                  enum: [render]
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Notification'
     *        404:
     *          description: Failed operation. The resource was not found.
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  $ref: '#/components/schemas/Error'
     */
    private async update(
        options: ApiHandlerOptions<{
            params: NotificationGetOneRequestDto;
            body: UpdateNotificationRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.notificationService.update(
                options.params.id,
                options.body,
            ),
        };
    }
}

export { NotificationController };
