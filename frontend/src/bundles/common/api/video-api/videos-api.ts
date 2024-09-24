import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { VideosApiPath } from './enums/enums.js';
import {
    type CreateVideoRequestDto,
    type UpdateVideoRequestDto,
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

    public async updateVideo(
        payload: UpdateVideoRequestDto,
        id: string,
    ): Promise<VideoGetAllItemResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(VideosApiPath.ID, { id }),
            {
                method: HTTPMethod.PATCH,
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<VideoGetAllItemResponseDto>();
    }

    public async deleteVideo(id: string): Promise<void> {
        const response = await this.load(
            this.getFullEndpoint(`${VideosApiPath.ROOT}${id}`, {}),
            {
                method: HTTPMethod.DELETE,
                contentType: ContentType.JSON,
                payload: JSON.stringify({}),
                hasAuth: true,
            },
        );

        await response.json<boolean>();
    }

    public async getVideoIdJWT(id: string): Promise<string> {

            const response = await this.load(
                this.getFullEndpoint(`${VideosApiPath.ROOT}${id}/share`, {}),
                {
                    method: HTTPMethod.GET,
                    contentType: ContentType.JSON,
                    hasAuth: true,
                },
            );
            
            if (!response.ok) {
                throw new Error(`Failed to get video ID JWT: ${response.statusText}`);
            }        
            return await response.text();
    }
}

export { VideosApi };
