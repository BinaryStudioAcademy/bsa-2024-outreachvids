import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AvatarService } from './avatar.service.js';
import { AvatarApiPath } from './enums/enums.js';
import { type TextToSpeechRequestDto } from './types/types.js';

class AvatarController extends BaseController {
    private azureAIService: AvatarService;

    public constructor(logger: Logger, azureAIService: AvatarService) {
        super(logger, ApiPath.AZURE_AI);

        this.azureAIService = azureAIService;

        this.addRoute({
            path: AvatarApiPath.AVATAR_VOICES,
            method: HTTPMethod.GET,
            handler: () => this.getVoices(),
        });

        this.addRoute({
            path: AvatarApiPath.TEXT_TO_SPEECH,
            method: HTTPMethod.POST,
            handler: (options) =>
                this.generateSpeech(
                    options as ApiHandlerOptions<{
                        body: TextToSpeechRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /azure-ai/voices:
     *   get:
     *     summary: Get available voices
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     */
    private async getVoices(): Promise<ApiHandlerResponse> {
        const voices = await this.azureAIService.getVoices();
        return {
            status: HttpCode.OK,
            payload: voices,
        };
    }

    /**
     * @swagger
     * /azure-ai/generate-speech:
     *   post:
     *     summary: Generate speech from text
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/GenerateSpeechRequestDto'
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 payload:
     *                   type: string
     */
    private async generateSpeech(
        options: ApiHandlerOptions<{ body: TextToSpeechRequestDto }>,
    ): Promise<ApiHandlerResponse> {
        const { text, voice } = options.body;
        const audioFileUrl = await this.azureAIService.generateSpeech(
            text,
            voice,
        );
        return {
            status: HttpCode.OK,
            payload: audioFileUrl,
        };
    }
}

export { AvatarController };
