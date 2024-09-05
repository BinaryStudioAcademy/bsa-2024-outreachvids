import { type UserService } from '~/bundles/users/user.service.js';
import {
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { type ApiHandlerOptions } from '~/common/controller/types/types.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          fullName:
 *            type: string
 */
class UserController extends BaseController {
    private userService: UserService;

    public constructor(logger: Logger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: HTTPMethod.GET,
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: UsersApiPath.CURRENT,
            method: HTTPMethod.GET,
            handler: (handlerOptions: ApiHandlerOptions) =>
                this.getCurrent(handlerOptions),
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns an array of users
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
     *                    items:
     *                      $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }
    /**
     * @swagger
     * /users/current:
     *    get:
     *      description: Returns current authorized user
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private getCurrent({ user }: ApiHandlerOptions): ApiHandlerResponse {
        return {
            status: HttpCode.OK,
            payload: user,
        };
    }
}

export { UserController };
