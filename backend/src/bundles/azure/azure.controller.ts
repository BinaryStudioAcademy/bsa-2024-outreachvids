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
import {
    type AzureGetAvatarRequestDto,
    type AzureTextToSpeechRequestDto,
} from './types/types.js';

class AzureController extends BaseController {
    private azureService: AzureService;

    public constructor(logger: Logger, azureService: AzureService) {
        super(logger, ApiPath.AZURE);

        this.azureService = azureService;
        
        this.addRoute({
            path: AzureApiPath.AVATAR,
            method: 'POST',
            handler: (options) =>
                this.getAvatarConfig(
                    options as ApiHandlerOptions<{
                        body: AzureGetAvatarRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AzureApiPath.TEXT_TO_SPEECH,
            method: 'POST',
            handler: (options) =>
                this.textToSpeech(
                    options as ApiHandlerOptions<{
                        body: AzureTextToSpeechRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/azure/avatar-config:
     *   get:
     *     summary: Get avatar configuration
     *     parameters:
     *       - in: body
     *         name: character
     *         required: true
     *         schema:
     *           type: string
     *       - in: body
     *         name: style
     *         required: true
     *         schema:
     *           type: string
     *       - in: body
     *         name: voiceName
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 character:
     *                   type: string
     *                 style:
     *                   type: string
     *                 voiceName:
     *                   type: string
     */
    private async getAvatarConfig(
        options: ApiHandlerOptions<{ body: AzureGetAvatarRequestDto }>,
    ): Promise<ApiHandlerResponse> {
        const { character, style, voiceName } = options.body;

        return {
            payload: await this.azureService.getAvatarConfig(
                character,
                style,
                voiceName,
            ),
            status: HttpCode.OK,
        };
    }

    /**
     * @swagger
     * /api/azure/text-to-speech:
     *   post:
     *     summary: Convert text to speech
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               text:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           audio/mpeg:
     *             schema:
     *               type: string
     *               format: binary
     */
    private async textToSpeech(
        options: ApiHandlerOptions<{ body: AzureTextToSpeechRequestDto }>,
    ): Promise<ApiHandlerResponse> {
        const { text } = options.body;
        const audioData = await this.azureService.textToSpeech(text);

        return {
            status: HttpCode.OK,
            payload: audioData,
            /* headers: {
                'Content-Type': 'audio/mpeg',
            }, */
        };
    }
}

export { AzureController };
