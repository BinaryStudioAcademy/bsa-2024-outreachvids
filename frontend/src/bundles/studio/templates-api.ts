import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { TemplateApiPath } from './enums/enums.js';
import { type GetTemplatesResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class TemplatesApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.TEMPLATES, baseUrl, http, storage });
    }

    public async loadPublicTemplates(): Promise<GetTemplatesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(TemplateApiPath.PUBLIC, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<GetTemplatesResponseDto>();
    }

    public async loadUserTemplates(): Promise<GetTemplatesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(TemplateApiPath.USER, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<GetTemplatesResponseDto>();
    }
}

export { TemplatesApi };
