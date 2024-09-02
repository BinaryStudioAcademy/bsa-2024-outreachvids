import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import { type UserGetCurrentResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class UserApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getCurrent(): Promise<UserGetCurrentResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.CURRENT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<UserGetCurrentResponseDto>();
    }
}

export { UserApi };
