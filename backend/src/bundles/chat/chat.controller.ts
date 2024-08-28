import { type FastifySessionObject } from '@fastify/session';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import { MAX_TOKEN } from '~/common/services/open-ai/libs/constants/constants.js';
import {
    ChatPath,
    OpenAIRole,
} from '~/common/services/open-ai/libs/enums/enums.js';
import { type OpenAIService } from '~/common/services/open-ai/open-ai.service.js';

import { type ChatService } from './chat.service.js';
import { type GenerateTextRequestDto } from './libs/types/types.js';
import { textGenerationValidationSchema } from './libs/validation-schemas/validation-schemas.js';

class ChatController extends BaseController {
    private openAIService: OpenAIService;
    private chatService: ChatService;

    public constructor(
        logger: Logger,
        openAIService: OpenAIService,
        chatService: ChatService,
    ) {
        super(logger, ApiPath.CHAT);

        this.openAIService = openAIService;
        this.chatService = chatService;

        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: textGenerationValidationSchema,
            },
            handler: (options) =>
                this.generateChatAnswer(
                    options as ApiHandlerOptions<{
                        body: GenerateTextRequestDto;
                        session: FastifySessionObject;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.DELETE,
            handler: (options) =>
                this.deleteSession(
                    options as ApiHandlerOptions<{
                        session: FastifySessionObject;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /chat/:
     *    post:
     *      description: Returns generated text by Open AI
     *      requestBody:
     *        description: User message
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  generatedText:
     *                    type: string
     */

    private async generateChatAnswer(
        options: ApiHandlerOptions<{
            body: GenerateTextRequestDto;
            session: FastifySessionObject;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body, session } = options;

        session.chatHistory = this.chatService.addMessageToHistory(
            session.chatHistory,
            body.message,
            OpenAIRole.USER,
        );

        session.chatHistory = this.chatService.deleteOldMessages(
            session.chatHistory,
            MAX_TOKEN,
        );

        const generatedText = await this.openAIService.generateText(
            session.chatHistory,
        );

        session.chatHistory = this.chatService.addMessageToHistory(
            session.chatHistory,
            generatedText,
            OpenAIRole.ASSISTANT,
        );

        return {
            payload: { generatedText },
            status: HttpCode.OK,
        };
    }

    /**
     * @swagger
     * /chat/:
     *    delete:
     *      description: Clears chat history
     *      requestBody:
     *        description: User message
     *        required: false
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  isDeleted:
     *                    type: boolean
     *        500:
     *          description: Failed operation
     *          content:
     *            application/json:
     *              schema:
     *                  type: object
     *                  properties:
     *                    isDeleted:
     *                      type: boolean
     */
    private deleteSession(
        options: ApiHandlerOptions<{
            session: FastifySessionObject;
        }>,
    ): ApiHandlerResponse {
        const { session } = options;

        session.destroy((error) => {
            if (error) {
                return {
                    payload: { isDeleted: false },
                    status: HttpCode.INTERNAL_SERVER_ERROR,
                };
            }
        });

        return {
            payload: { isDeleted: true },
            status: HttpCode.OK,
        };
    }
}

export { ChatController };
