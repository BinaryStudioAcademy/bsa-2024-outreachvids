import { ApiPath } from 'shared';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AvatarVideoService } from './avatar-videos.service.js';
import { AvatarVideosApiPath } from './enums/enums.js';
import {
    type GetAvatarVideoRequestDto,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';
import { renderAvatarVideoValidationSchema } from './validation-schemas/validation-schemas.js';

class AvatarVideoController extends BaseController {
    private avatarVideoService: AvatarVideoService;

    public constructor(logger: Logger, avatarVideoService: AvatarVideoService) {
        super(logger, ApiPath.AVATAR_VIDEO);

        this.avatarVideoService = avatarVideoService;

        this.addRoute({
            path: AvatarVideosApiPath.ID,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.getAvatarVideo(
                    options as ApiHandlerOptions<{
                        params: GetAvatarVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AvatarVideosApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: renderAvatarVideoValidationSchema,
            },
            handler: (options) =>
                this.renderAvatarVideo(
                    options as ApiHandlerOptions<{
                        body: RenderAvatarVideoRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /avatar-video/:id:
     *    get:
     *      description: Get video url
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  url:
     *                    type: string
     */
    private async getAvatarVideo(
        options: ApiHandlerOptions<{
            params: GetAvatarVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.avatarVideoService.getAvatarVideo({
                id: options.params.id,
            }),
            status: HttpCode.OK,
        };
    }

    /**
     * @swagger
     * /avatar-video:
     *    post:
     *      description: Generate video from text
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Data for video generation
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [text, voice, avatarName, avatarStyle]
     *              properties:
     *                text:
     *                  type: string
     *                voice:
     *                  type: string
     *                avatarName:
     *                  type: string
     *                avatarStyle:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     */
    private async renderAvatarVideo(
        options: ApiHandlerOptions<{
            body: RenderAvatarVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.avatarVideoService.renderAvatarVideo(
                options.body,
            ),
            status: HttpCode.CREATED,
        };
    }
}

export { AvatarVideoController };
