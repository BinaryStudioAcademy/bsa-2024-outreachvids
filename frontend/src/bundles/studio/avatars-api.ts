import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type AvatarGetAllResponseDto } from '~/bundles/studio/types/types.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { AvatarsApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AvatarsApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AVATARS, baseUrl, http, storage });
    }

    public async loadAvatars(): Promise<AvatarGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AvatarsApiPath.ROOT, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<AvatarGetAllResponseDto>();
    }
}

export { AvatarsApi };
