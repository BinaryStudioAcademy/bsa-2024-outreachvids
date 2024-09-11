import { VideosApiPath } from 'shared';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type VideoGetAllResponseDto } from '~/bundles/home/types/types.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

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
            this.getFullEndpoint(VideosApiPath.USER_ID, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<VideoGetAllResponseDto>();
    }
}

export { VideosApi };
