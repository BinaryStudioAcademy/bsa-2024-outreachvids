import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { ChatPath, OpenAIRole } from './libs/enums/enums.js';
import {
    type GenerateTextRequestDto,
    type SessionChatHistory,
} from './libs/types/types.js';
import { textGenerationValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type OpenAIService } from './open-ai.service.js';

class ChatController extends BaseController {
    private openAIService: OpenAIService;

    public constructor(logger: Logger, openAIService: OpenAIService) {
        super(logger, ApiPath.CHAT);

        this.openAIService = openAIService;

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
                        session: SessionChatHistory;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatPath.ROOT,
            method: HTTPMethod.DELETE,
            handler: (options) =>
                this.clearChat(
                    options as ApiHandlerOptions<{
                        session: SessionChatHistory;
                    }>,
                ),
        });
    }

    private async generateChatAnswer(
        options: ApiHandlerOptions<{
            body: GenerateTextRequestDto;
            session: SessionChatHistory;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body, session } = options;

        this.openAIService.addMessageToHistory(
            session.chatHistory,
            body.message,
            OpenAIRole.USER,
        );

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
            session: SessionChatHistory;
        }>,
    ): ApiHandlerResponse {
        this.openAIService.clearChatHistory(options.session);
        return {
            payload: true,
            status: HttpCode.OK,
        };
    }
}

export { ChatController };
