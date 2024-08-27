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
import {
    type CreateVideoRequestDto,
    type UpdateVideoRequestDto,
    type VideoGetOneRequestDto,
} from './types/types.js';
import {
    createVideoValidationSchema,
    updateVideoValidationSchema,
} from './validation-schemas/validation-schemas.js';

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

        this.addRoute({
            path: VideosApiPath.ROOT,
            method: 'POST',
            validation: {
                body: createVideoValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: CreateVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: VideosApiPath.VIDEO,
            method: 'PATCH',
            validation: {
                body: updateVideoValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        params: VideoGetOneRequestDto;
                        body: UpdateVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: VideosApiPath.VIDEO,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
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
            payload: await this.videoService.find(options.params.id),
        };
    }

    private async create(
        options: ApiHandlerOptions<{
            body: CreateVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.videoService.create(options.body),
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
            body: UpdateVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.videoService.update(
                options.params.id,
                options.body,
            ),
        };
    }

    private async delete(
        options: ApiHandlerOptions<{
            params: VideoGetOneRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.videoService.delete(options.params.id),
        };
    }
}

export { VideoController };
