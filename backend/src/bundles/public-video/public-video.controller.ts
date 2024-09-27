import { type PublicVideoService } from '~/bundles/public-video/public-video.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HTTPCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { PublicVideosApiPath } from './enums/public-videos-api-path.enum.js';

class PublicVideoController extends BaseController {
    private publicVideoService: PublicVideoService;

    public constructor(logger: Logger, publicVideoService: PublicVideoService) {
        super(logger, ApiPath.PUBLIC_VIDEO);

        this.publicVideoService = publicVideoService;

        this.addRoute({
            path: PublicVideosApiPath.ROOT,
            method: HTTPMethod.GET,
            handler: (options) => this.findUrlByToken(options),
        });
    }

    private async findUrlByToken(
        options: ApiHandlerOptions,
    ): Promise<ApiHandlerResponse> {
        const headers = options.headers as Record<string, { value: string }>;
        const videoTokenHeader = headers['video_token']?.toString() ?? '';

        return {
            status: HTTPCode.OK,
            payload:
                await this.publicVideoService.findUrlByToken(videoTokenHeader),
        };
    }
}

export { PublicVideoController };
