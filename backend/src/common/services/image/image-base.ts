import { type Http, ContentType, HTTPMethod } from 'shared';

import { BaseHttpApi } from '~/common/http/base-http-api.js';

type Constructor = {
    http: Http;
};

class ImageApi extends BaseHttpApi {
    public constructor({ http }: Constructor) {
        super({ path: '', baseUrl: '', http });
    }

    public async getImageBuffer(url: string): Promise<Buffer> {
        const response = await this.load(url, {
            method: HTTPMethod.GET,
            contentType: ContentType.IMAGE,
        });

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
}

export { ImageApi };
