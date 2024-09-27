import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HTTPCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { TemplateApiPath } from './enums/enums.js';
import { type TemplateService } from './templates.service.js';
import {
    type CreateTemplateRequestDto,
    type GetTemplateRequestDto,
    type UpdateTemplateRequestDto,
    type UserGetCurrentResponseDto,
} from './types/types.js';
import {
    createTemplateValidationSchema,
    updateTemplateValidationSchema,
} from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         previewUrl:
 *           type: string
 *           format: url
 *         composition:
 *           $ref: '#/components/schemas/Composition'
 *     Composition:
 *       type: object
 *       properties:
 *         scenes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Scene'
 *         scripts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Script'
 *         videoOrientation:
 *           type: string
 *           enum:
 *             - landscape
 *             - portrait
 *     SceneAvatar:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         style:
 *           type: string
 *         url:
 *           type: string
 *           format: url
 *     Scene:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         duration:
 *           type: number
 *         avatar:
 *           $ref: '#/components/schemas/SceneAvatar'
 *         background:
 *           $ref: '#/components/schemas/SceneBackground'
 *     SceneBackground:
 *       type: object
 *       properties:
 *         color:
 *           type: string
 *         url:
 *           type: string
 *           format: url
 *     Script:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         duration:
 *           type: number
 *         text:
 *           type: string
 *         voiceName:
 *           type: string
 *         url:
 *           type: string
 *           format: url
 */
class TemplateController extends BaseController {
    private templateService: TemplateService;

    public constructor(logger: Logger, templateService: TemplateService) {
        super(logger, ApiPath.TEMPLATES);

        this.templateService = templateService;

        this.addRoute({
            path: TemplateApiPath.USER,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.findAllByUser(
                    options as ApiHandlerOptions<{
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: TemplateApiPath.PUBLIC,
            method: HTTPMethod.GET,
            handler: () => {
                return this.findPublicTemplates();
            },
        });

        this.addRoute({
            path: TemplateApiPath.ID,
            method: HTTPMethod.GET,
            handler: (options) => {
                return this.findById(
                    options as ApiHandlerOptions<{
                        params: GetTemplateRequestDto;
                    }>,
                );
            },
        });

        this.addRoute({
            path: TemplateApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: createTemplateValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CreateTemplateRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: TemplateApiPath.ID,
            method: HTTPMethod.PATCH,
            validation: {
                body: updateTemplateValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        params: GetTemplateRequestDto;
                        body: UpdateTemplateRequestDto;
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: TemplateApiPath.ID,
            method: HTTPMethod.DELETE,
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        params: GetTemplateRequestDto;
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /templates/user:
     *    get:
     *      description: Get all user templates
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
     *                    description: A list of templates objects
     *                    items:
     *                      $ref: '#/components/schemas/Template'
     */

    private async findAllByUser(
        options: ApiHandlerOptions<{
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.templateService.findByUserId(options.user.id),
        };
    }

    /**
     * @swagger
     * /templates/public:
     *    get:
     *      description: Get all public templates
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
     *                    description: A list of public templates objects
     *                    items:
     *                      $ref: '#/components/schemas/Template'
     */

    private async findPublicTemplates(): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.templateService.findPublicTemplates(),
        };
    }

    /**
     * @swagger
     * /templates/{id}:
     *    patch:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The template id
     *      description: Update template by id
     *      security:
     *       - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Template'
     */
    private async findById(
        options: ApiHandlerOptions<{
            params: GetTemplateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.templateService.findById(options.params.id),
        };
    }

    /**
     * @swagger
     * /templates/:
     *    post:
     *      description: Create new template
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Template data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [name, composition]
     *              properties:
     *                name:
     *                  type: string
     *                composition:
     *                  $ref: '#/components/schemas/Composition'
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Template'
     */

    private async create(
        options: ApiHandlerOptions<{
            body: CreateTemplateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.CREATED,
            payload: await this.templateService.create({
                ...options.body,
                userId: (options.user as UserGetCurrentResponseDto).id,
            }),
        };
    }

    /**
     * @swagger
     * /templates/{id}:
     *    patch:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The template id
     *      description: Update template by id
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Template data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [name, composition]
     *              properties:
     *                name:
     *                  type: string
     *                composition:
     *                  $ref: '#/components/schemas/Composition'
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Template'
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
            params: GetTemplateRequestDto;
            body: UpdateTemplateRequestDto;
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.templateService.updateTemplate(
                options.params.id,
                options.body,
                options.user.id,
            ),
        };
    }

    /**
     * @swagger
     * /templates/{id}:
     *    delete:
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *            format: uuid
     *          description: The template id
     *      description: Delete template by id
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
            params: GetTemplateRequestDto;
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HTTPCode.OK,
            payload: await this.templateService.deleteTemplate(
                options.params.id,
                options.user.id,
            ),
        };
    }
}

export { TemplateController };
