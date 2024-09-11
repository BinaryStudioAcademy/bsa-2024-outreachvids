import { type Http } from 'shared';
import { ApiPath, ContentType, HttpHeader, HTTPMethod } from 'shared';

import { config } from '~/common/config/config.js';
import { BaseHttpApi } from '~/common/http/http.js';
import {
    type GetAvatarVideoResponseDto,
    type RenderAvatarVideoResponseDto,
} from '~/common/services/azure-ai/types/types.js';

import { API_VERSION } from './constants/constants.js';
import { AvatarApiPath } from './enums/enums.js';
import { type RenderAvatarVideoArgument } from './types/types.js';

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
    ): Promise<GetAvatarVideoResponseDto> {
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
                        key: HttpHeader.AZURE_KEY,
                        value: config.ENV.AZURE.SUBSCRIPTION_KEY,
                    },
                ],
            },
        );

        return await response.json<GetAvatarVideoResponseDto>();
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
    }: RenderAvatarVideoArgument): Promise<RenderAvatarVideoResponseDto> {
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
                        key: HttpHeader.AZURE_KEY,
                        value: config.ENV.AZURE.SUBSCRIPTION_KEY,
                    },
                ],
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<RenderAvatarVideoResponseDto>();
    }
}

export { AvatarVideoApi };
