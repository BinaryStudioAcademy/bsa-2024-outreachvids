import { type FastifySessionObject } from '@fastify/session';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type ChatService } from './char.service.js';
import { MAX_TOKEN } from './libs/constants/max-token.constant.js';
import { ChatPath, OpenAIRole } from './libs/enums/enums.js';
import { type GenerateTextRequestDto } from './libs/types/types.js';
import { textGenerationValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type OpenAIService } from './open-ai.service.js';

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
                this.clearChat(
                    options as ApiHandlerOptions<{
                        session: FastifySessionObject;
                    }>,
                ),
        });
    }

    private async generateChatAnswer(
        options: ApiHandlerOptions<{
            body: GenerateTextRequestDto;
            session: FastifySessionObject;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body, session } = options;

        this.chatService.addMessageToHistory(
            session.chatHistory,
            body.message,
            OpenAIRole.USER,
        );

        this.chatService.deleteOldMessages(session.chatHistory, MAX_TOKEN);

        const generatedText = await this.openAIService.generateText(
            session.chatHistory,
        );

        this.chatService.addMessageToHistory(
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
        this.chatService.clearChatHistory(options.session.chatHistory);
        return {
            payload: true,
            status: HttpCode.OK,
        };
    }
}

export { ChatController };
