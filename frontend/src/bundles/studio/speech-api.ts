import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
} from '~/bundles/studio/types/types.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/base-http-api.package.js';
import { type Storage } from '~/framework/storage/storage.js';

import { SpeechApiPath } from './enums/enums.js';
import { type GetVoicesResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class SpeechApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.SPEECH, baseUrl, http, storage });
    }

    public async generateScriptSpeech(
        payload: GenerateSpeechRequestDto,
    ): Promise<GenerateSpeechResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SpeechApiPath.GENERATE, {}),
            {
                method: HTTPMethod.POST,
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<GenerateSpeechResponseDto>();
    }

    public async loadVoices(): Promise<GetVoicesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SpeechApiPath.VOICES, {}),
            {
                method: HTTPMethod.GET,
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<GetVoicesResponseDto>();
    }
}

export { SpeechApi };
