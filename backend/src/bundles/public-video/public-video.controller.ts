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
            method: HTTPMethod.POST,
            handler: (options) => {
                return this.findUrlByToken(
                    options as ApiHandlerOptions<{
                        body: { id: string };
                    }>,
                );
            },
        });
    }

    private async findUrlByToken(
        options: ApiHandlerOptions<{
            body: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        // eslint-disable-next-line no-console
        console.log(options.body, 'options.body');
        const jwt = options.body.id;
        // eslint-disable-next-line no-console
        console.log(jwt, 'jwt');
        return {
            status: HTTPCode.OK,
            payload: await this.publicVideoService.findUrlByToken(jwt),
        };
    }
}

export { PublicVideoController };
