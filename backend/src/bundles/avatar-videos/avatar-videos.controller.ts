import { ApiPath } from 'shared';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { HttpCode, HTTPMethod } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import { type AvatarVideoService } from './avatar-videos.service.js';
import { AvatarVideosApiPath } from './enums/enums.js';
import {
    type GetAvatarVideoRequestDto,
    type RenderAvatarVideoRequestDto,
} from './types/types.js';
import { renderAvatarVideoValidationSchema } from './validation-schemas/validation-schemas.js';

class AvatarVideoController extends BaseController {
    private avatarVideoService: AvatarVideoService;

    public constructor(logger: Logger, avatarVideoService: AvatarVideoService) {
        super(logger, ApiPath.AVATAR_VIDEO);

        this.avatarVideoService = avatarVideoService;

        this.addRoute({
            path: AvatarVideosApiPath.ID,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.getAvatarVideo(
                    options as ApiHandlerOptions<{
                        params: GetAvatarVideoRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AvatarVideosApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: renderAvatarVideoValidationSchema,
            },
            handler: (options) =>
                this.renderAvatarVideo(
                    options as ApiHandlerOptions<{
                        body: RenderAvatarVideoRequestDto;
                    }>,
                ),
        });
    }

    private async getAvatarVideo(
        options: ApiHandlerOptions<{
            params: GetAvatarVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.avatarVideoService.getAvatarVideo({
                id: options.params.id,
            }),
            status: HttpCode.OK,
        };
    }

    private async renderAvatarVideo(
        options: ApiHandlerOptions<{
            body: RenderAvatarVideoRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.avatarVideoService.renderAvatarVideo(
                options.body,
            ),
            status: HttpCode.CREATED,
        };
    }
}

export { AvatarVideoController };
