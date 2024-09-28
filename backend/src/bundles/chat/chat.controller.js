import { BaseController, } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { MAX_TOKEN } from '~/common/services/open-ai/libs/constants/constants.js';
import { ChatPath, OpenAIRole, } from '~/common/services/open-ai/libs/enums/enums.js';
import { textGenerationValidationSchema } from './libs/validation-schemas/validation-schemas.js';
class ChatController extends BaseController {
    openAIService;
    chatService;
    constructor(logger, openAIService, chatService) {
        super(logger, ApiPath.CHAT);
        this.openAIService = openAIService;
        this.chatService = chatService;
        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: textGenerationValidationSchema,
            },
            handler: (options) => this.generateChatAnswer(options),
        });
        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.DELETE,
            handler: (options) => this.deleteSession(options),
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
    async generateChatAnswer(options) {
        const { body, session } = options;
        session.chatHistory = this.chatService.addMessageToHistory(session.chatHistory, body.message, OpenAIRole.USER);
        session.chatHistory = this.chatService.deleteOldMessages(session.chatHistory, MAX_TOKEN);
        const generatedText = await this.openAIService.generateText(session.chatHistory);
        session.chatHistory = this.chatService.addMessageToHistory(session.chatHistory, generatedText, OpenAIRole.ASSISTANT);
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
    deleteSession(options) {
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
