import { type FastifySessionObject } from '@fastify/session';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { MAX_TOKEN } from './libs/constants/max-token.constant.js';
import { ChatPath, OpenAIRole } from './libs/enums/enums.js';
import { type GenerateTextRequestDto } from './libs/types/types.js';
import { textGenerationValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type OpenAIService } from './open-ai.service.js';

class ChatController extends BaseController {
    private openAIService: OpenAIService;

    public constructor(logger: Logger, openAIService: OpenAIService) {
        super(logger, ApiPath.CHAT);

        this.openAIService = openAIService;

        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.PUT,
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
                this.clearChat(
                    options as ApiHandlerOptions<{
                        session: FastifySessionObject;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.POST,
            handler: (options) =>
                this.deleteSession(
                    options as ApiHandlerOptions<{
                        session: FastifySessionObject;
                    }>,
                ),
        });
    }

    private deleteSession(
        options: ApiHandlerOptions<{
            session: FastifySessionObject;
        }>,
    ): ApiHandlerResponse {
        const { session } = options;

        session.destroy((error) => {
            if (error) {
                return {
                    payload: false,
                    status: HttpCode.INTERNAL_SERVER_ERROR,
                };
            }
        });

        return {
            payload: true,
            status: HttpCode.OK,
        };
    }

    private async generateChatAnswer(
        options: ApiHandlerOptions<{
            body: GenerateTextRequestDto;
            session: FastifySessionObject;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body, session } = options;

        this.openAIService.addMessageToHistory(
            session.chatHistory,
            body.message,
            OpenAIRole.USER,
        );

        this.openAIService.deleteOldMessages(session.chatHistory, MAX_TOKEN);

        const generatedText = await this.openAIService.generateText(
            session.chatHistory,
        );

        this.openAIService.addMessageToHistory(
            session.chatHistory,
            generatedText,
            OpenAIRole.ASSISTANT,
        );

        return {
            payload: generatedText,
            status: HttpCode.OK,
        };
    }

    private clearChat(
        options: ApiHandlerOptions<{
            session: FastifySessionObject;
        }>,
    ): ApiHandlerResponse {
        this.openAIService.clearChatHistory(options.session.chatHistory);
        return {
            payload: true,
            status: HttpCode.OK,
        };
    }
}

export { ChatController };
