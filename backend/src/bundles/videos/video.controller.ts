import { type VideoService } from '~/bundles/videos/video.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { VideosApiPath } from './enums/enums.js';
import { type VideoGetOneRequestDto } from './types/types.js';

class VideoController extends BaseController {
    private videoService: VideoService;

    public constructor(logger: Logger, videoService: VideoService) {
        super(logger, ApiPath.VIDEOS);

        this.videoService = videoService;

        this.addRoute({
            path: VideosApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: VideosApiPath.VIDEO,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                    }>,
                ),
        });
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.videoService.findAll(),
        };
    }

    private async find(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.videoService.find(options.params.videoId),
        };
    }
}

export { VideoController };
