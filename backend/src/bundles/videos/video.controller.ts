import { type VideoService } from '~/bundles/videos/video.service.js';
import {
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { VideosApiPath } from './enums/enums.js';

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
    }

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.videoService.findAll(),
        };
    }
}

export { VideoController };
