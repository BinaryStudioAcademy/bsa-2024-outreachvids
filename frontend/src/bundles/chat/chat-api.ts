import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { ChatApiPath } from './enums/enums.js';
import { type ChatRequestDto, type ChatResponseDto } from './types/types.js';

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
        payload: ChatRequestDto,
    ): Promise<ChatResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatApiPath.SEND_MESSAGE, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<ChatResponseDto>();
    }
}

export { ChatApi };
