import { type Http } from 'shared';
import { ApiPath, ContentType, HttpHeader, HTTPMethod } from 'shared';

import { config } from '~/common/config/config.js';
import { BaseHttpApi } from '~/common/http/http.js';

import { AvatarApiPath } from './libs/enums/enums.js';
import {
    type GetAvatarVideoResponseApiDto,
    type RenderAvatarVideoApiArgument,
    type RenderAvatarVideoApiResponseDto,
} from './libs/types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
};

class AvatarVideoApi extends BaseHttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: ApiPath.AVATAR, baseUrl, http });
    }

    public async getAvatarVideo(
        id: string,
    ): Promise<GetAvatarVideoResponseApiDto> {
        const response = await this.load(
            this.getFullEndpoint(
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=2024-08-01`,
                {},
            ),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HttpHeader.AZURE_KEY,
                        value: config.ENV.AZURE.SUBSCRIPTION_KEY,
                    },
                ],
            },
        );

        return await response.json<GetAvatarVideoResponseApiDto>();
    }

    public async deleteAvatarVideo(id: string): Promise<unknown> {
        return await this.load(
            this.getFullEndpoint(
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=2024-08-01`,
                {},
            ),
            {
                method: HTTPMethod.DELETE,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HttpHeader.AZURE_KEY,
                        value: config.ENV.AZURE.SUBSCRIPTION_KEY,
                    },
                ],
            },
        );
    }

    public async renderAvatarVideo({
        id,
        payload,
    }: RenderAvatarVideoApiArgument): Promise<RenderAvatarVideoApiResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=2024-08-01`,
                {},
            ),
            {
                method: HTTPMethod.PUT,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HttpHeader.AZURE_KEY,
                        value: config.ENV.AZURE.SUBSCRIPTION_KEY,
                    },
                ],
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<RenderAvatarVideoApiResponseDto>();
    }

    public async getAvatarVideoBuffer(url: string): Promise<Buffer> {
        const response = await this.load(url, {
            method: HTTPMethod.GET,
            contentType: ContentType.JSON,
        });

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
}

export { AvatarVideoApi };
