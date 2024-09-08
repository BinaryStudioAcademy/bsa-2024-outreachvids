import { config } from '~/common/config/config.js';
import { BaseHttpApi } from '~/common/http/base-http-api.js';
import {
    type Http,
    ContentType,
    HttpHeader,
    HTTPMethod,
} from '~/common/http/http.js';

import { TextToSpeechApiPath } from '../../enums/enums.js';
import { type AzureGetVoicesResponseDto } from '../../types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
};

class TextToSpeechApi extends BaseHttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: '', baseUrl, http });
    }

    public async getVoices(): Promise<Array<AzureGetVoicesResponseDto>> {
        const response = await this.load(
            this.getFullEndpoint(TextToSpeechApiPath.VOICES, {}),
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

        return await response.json<Array<AzureGetVoicesResponseDto>>();
    }
}

export { TextToSpeechApi };
