import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HTTPCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { SpeechApiPath } from './enums/enums.js';
import { type SpeechService } from './speech.service.js';
import { type GenerateSpeechRequestDto } from './types/types.js';
import { generateSpeechValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Voice:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          shortName:
 *            type: string
 *          gender:
 *            type: string
 *          locale:
 *            type: string
 *          localeName:
 *            type: string
 *          voiceType:
 *            type: string
 */
class SpeechController extends BaseController {
    private speechService: SpeechService;

    public constructor(logger: Logger, speechService: SpeechService) {
        super(logger, ApiPath.SPEECH);

        this.speechService = speechService;

        this.addRoute({
            path: SpeechApiPath.VOICES,
            method: HTTPMethod.GET,
            handler: () => this.getVoices(),
        });

        this.addRoute({
            path: SpeechApiPath.GENERATE,
            method: HTTPMethod.POST,
            validation: {
                body: generateSpeechValidationSchema,
            },
            handler: (options) =>
                this.generateSpeech(
                    options as ApiHandlerOptions<{
                        body: GenerateSpeechRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /speech/voices:
     *    get:
     *      description: Get list of voices
     *      security:
     *       - bearerAuth: []
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
     *                      $ref: '#/components/schemas/Voice'
     */

    private async getVoices(): Promise<ApiHandlerResponse> {
        return {
            payload: await this.speechService.getVoices(),
            status: HTTPCode.OK,
        };
    }

    /**
     * @swagger
     * /speech/generate:
     *    post:
     *      description: Generate speech from text
     *      security:
     *       - bearerAuth: []
     *      requestBody:
     *        description: Data for text to speech generation
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              required: [text, voiceName]
     *              properties:
     *                scriptId:
     *                  type: string
     *                text:
     *                  type: string
     *                voiceName:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  scriptId:
     *                    type: string
     *                  audioUrl:
     *                    type: string
     */

    private async generateSpeech(
        options: ApiHandlerOptions<{
            body: GenerateSpeechRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.speechService.generateSpeech(options.body),
            status: HTTPCode.CREATED,
        };
    }
}

export { SpeechController };
