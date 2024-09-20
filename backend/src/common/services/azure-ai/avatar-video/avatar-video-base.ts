import { type Http } from 'shared';
import { ApiPath, ContentType, HTTPHeader, HTTPMethod } from 'shared';

import { config } from '~/common/config/config.js';
import { BaseHttpApi } from '~/common/http/http.js';

import { API_VERSION } from './constants/constants.js';
import { AvatarApiPath } from './enums/enums.js';
import {
    type GetAvatarVideoResponseApiDto,
    type RenderAvatarVideoApiArgument,
    type RenderAvatarVideoApiResponseDto,
} from './types/types.js';

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
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=${API_VERSION}`,
                {},
            ),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HTTPHeader.AZURE_KEY,
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
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=${API_VERSION}`,
                {},
            ),
            {
                method: HTTPMethod.DELETE,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HTTPHeader.AZURE_KEY,
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
                `${AvatarApiPath.BATCHSYNTHESES}/${id}?api-version=${API_VERSION}`,
                {},
            ),
            {
                method: HTTPMethod.PUT,
                contentType: ContentType.JSON,
                headers: [
                    {
                        key: HTTPHeader.AZURE_KEY,
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
