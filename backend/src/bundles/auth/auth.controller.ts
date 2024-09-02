import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';
import { userSignUpValidationSchema } from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

class AuthController extends BaseController {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-in:
     *    post:
     *      description: Sign in user into the application
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [email, password]
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     *        401:
     *          description: Failed operation. Unauthorized.
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  $ref: '#/components/schemas/Error'
     */

    private async signIn(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.authService.signIn(options.body),
            status: HttpCode.OK,
        };
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      description: Sign up user into the application
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [fullName, email, password, confirmPassword]
     *              properties:
     *                fullName:
     *                  type: string
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *                confirmPassword:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     *        400:
     *          description: Failed operation
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  $ref: '#/components/schemas/Error'
     */

    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(options.body),
        };
    }
}

export { AuthController };
