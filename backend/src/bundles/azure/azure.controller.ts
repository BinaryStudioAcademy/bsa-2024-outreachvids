import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AzureService } from './azure.service.js';
import { AzureApiPath } from './enums/enums.js';
import { type AzureTextToSpeechRequestDto } from './types/types.js';

class AzureAIController extends BaseController {
    private azureAIService: AzureService;

    public constructor(logger: Logger, azureAIService: AzureService) {
        super(logger, ApiPath.AZURE_AI);

        this.azureAIService = azureAIService;

        this.addRoute({
            path: AzureApiPath.AVATAR_VOICES,
            method: 'GET',
            handler: () => this.getVoices(),
        });

        this.addRoute({
            path: AzureApiPath.TEXT_TO_SPEECH,
            method: 'POST',
            handler: (options) =>
                this.generateSpeech(
                    options as ApiHandlerOptions<{
                        body: AzureTextToSpeechRequestDto;
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
        options: ApiHandlerOptions<{ body: AzureTextToSpeechRequestDto }>,
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

export { AzureAIController };
