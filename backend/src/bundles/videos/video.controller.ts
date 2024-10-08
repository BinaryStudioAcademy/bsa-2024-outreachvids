import { type VideoService } from '~/bundles/videos/video.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HTTPCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { VideosApiPath } from './enums/enums.js';
import {
    type CreateVideoRequestDto,
    type UpdateVideoRequestDto,
    type UserGetCurrentResponseDto,
    type VideoGetOneRequestDto,
} from './types/types.js';
import {
    createVideoValidationSchema,
    updateVideoValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Video:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          userId:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          url:
 *            type: string
 *            format: url
 */
class VideoController extends BaseController {
    private videoService: VideoService;

    public constructor(logger: Logger, videoService: VideoService) {
        super(logger, ApiPath.VIDEOS);

        this.videoService = videoService;

        this.addRoute({
            path: VideosApiPath.ROOT,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.findAllByUser(
                    options as ApiHandlerOptions<{
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: VideosApiPath.ID,
            method: HTTPMethod.GET,
            handler: (options) => {
                return this.find(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: VideosApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: createVideoValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CreateVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: VideosApiPath.ID,
            method: HTTPMethod.PATCH,
            validation: {
                body: updateVideoValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                        body: UpdateVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: VideosApiPath.ID,
            method: HTTPMethod.DELETE,
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: `${VideosApiPath.ID}${VideosApiPath.SHARE}`,
            method: HTTPMethod.GET,
            handler: (options) => {
                return this.createVideoIdJWT(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                    }>,
                );
            },
        });
    }

    /**
     * @swagger
     * /videos/:
     *    get:
     *      description: Get all videos by user
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
     *                  items:
     *                    type: array
     *                    description: A list of video objects
     *                    items:
     *                      $ref: '#/components/schemas/Video'
     */

    private async findAllByUser(
        options: ApiHandlerOptions<{
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.videoService.findByUserId(options.user.id),
        };
    }

    /**
     * @swagger
     * /videos/{id}:
     *    get:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The video id
     *      description: Get video by id
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Video'
     *        404:
     *          description: Failed operation. The resource was not found.
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  $ref: '#/components/schemas/Error'
     */

    private async find(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.videoService.findById(options.params.id),
        };
    }

    /**
     * @swagger
     * /videos/{id}/share:
     *    get:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The video id
     *      description: Create a JWT for the video id
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
     *                  token:
     *                    type: string
     */
    private async createVideoIdJWT(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.videoService.getVideoIdToken(options.params.id),
        };
    }

    /**
     * @swagger
     * /videos/:
     *    post:
     *      description: Create new video
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Video data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [userId, name, url]
     *              properties:
     *                userId:
     *                  type: string
     *                  format: uuid
     *                name:
     *                  type: string
     *                url:
     *                  type: string
     *                  format: url
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Video'
     */

    private async create(
        options: ApiHandlerOptions<{
            body: CreateVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.CREATED,
            payload: await this.videoService.create({
                ...options.body,
                userId: (options.user as UserGetCurrentResponseDto).id,
            }),
        };
    }

    /**
     * @swagger
     * /videos/{id}:
     *    patch:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The video id
     *      description: Update video by id
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Video data
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                userId:
     *                  type: string
     *                  format: uuid
     *                name:
     *                  type: string
     *                url:
     *                  type: string
     *                  format: url
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Video'
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
            params: VideoGetOneRequestDto;
            body: UpdateVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.videoService.update(
                options.params.id,
                options.body,
            ),
        };
    }

    /**
     * @swagger
     * /videos/{id}:
     *    delete:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The video id
     *      description: Delete video by id
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: boolean
     *        404:
     *          description: Failed operation. The resource was not found.
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  $ref: '#/components/schemas/Error'
     */

    private async delete(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.videoService.delete(options.params.id),
        };
    }
}

export { VideoController };
