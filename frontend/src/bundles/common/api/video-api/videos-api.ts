import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { VideosApiPath } from './enums/enums.js';
import {
    type CreateVideoRequestDto,
    type VideoGetAllItemResponseDto,
    type VideoGetAllResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class VideosApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.VIDEOS, baseUrl, http, storage });
    }

    public async loadUserVideos(): Promise<VideoGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(VideosApiPath.ROOT, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<VideoGetAllResponseDto>();
    }

    public async saveVideo(
        payload: CreateVideoRequestDto,
    ): Promise<VideoGetAllItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(VideosApiPath.ROOT, {}),
            {
                method: HTTPMethod.POST,
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<VideoGetAllItemResponseDto>();
    }
}

export { VideosApi };
