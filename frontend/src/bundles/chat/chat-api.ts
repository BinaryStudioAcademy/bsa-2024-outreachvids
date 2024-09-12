import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { ChatApiPath } from './enums/enums.js';
import {
    type DeleteChatResponseDto,
    type GenerateTextRequestDto,
    type GenerateTextResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ChatApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CHAT, baseUrl, http, storage });
    }

    public async sendMessage(
        payload: GenerateTextRequestDto,
    ): Promise<GenerateTextResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatApiPath.ROOT, {}),
            {
                method: HTTPMethod.POST,
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                credentials: 'include',
                hasAuth: true,
            },
        );

        return await response.json<GenerateTextResponseDto>();
    }

    public async deleteChat(): Promise<DeleteChatResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatApiPath.ROOT, {}),
            {
                method: HTTPMethod.DELETE,
                contentType: ContentType.JSON,
                payload: JSON.stringify({}),
                credentials: 'include',
                keepAlive: true,
                hasAuth: true,
            },
        );

        return await response.json<DeleteChatResponseDto>();
    }
}

export { ChatApi };
