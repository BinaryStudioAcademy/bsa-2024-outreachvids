import { type AvatarService } from '~/bundles/avatars/avatar.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { AvatarsApiPath } from './enums/enums.js';
import { type AvatarGetOneRequestDto } from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Avatar:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          voice:
 *            type: string
 *          voiceUrl:
 *             type:string
 *          styles:
 *             type: array
 *           items:
 *             type: object
 *             properties:
 *               imgUrl:
 *                 type: string
 *               style:
 *                 type: string
 *               gestures:
 *                 type: array
 *                 items:
 *                   type: string
 */
class AvatarController extends BaseController {
    private avatarService: AvatarService;

    public constructor(logger: Logger, avatarService: AvatarService) {
        super(logger, ApiPath.AVATARS);

        this.avatarService = avatarService;

        this.addRoute({
            path: AvatarsApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: AvatarsApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: AvatarGetOneRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /avatars:
     *    get:
     *      description: Get all avatars
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
     *                    description: A list of avatar objects
     *                    items:
     *                      $ref: '#/components/schemas/Avatar'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.avatarService.findAll(),
        };
    }

    /**
     * @swagger
     * /avatars/{id}:
     *    get:
     *      description: Get avatar by id
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Avatar'
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
            params: AvatarGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { params } = options;
        const avatar = await this.avatarService.find(params.id);

        return {
            status: HttpCode.OK,
            payload: avatar,
        };
    }
}

export { AvatarController };
