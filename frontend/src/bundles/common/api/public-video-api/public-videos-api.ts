import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { type Http, HTTPMethod } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';
import { type Storage } from '~/framework/storage/storage.js';

import { VideosApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class PublicVideosApi extends BaseHttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.PUBLIC_VIDEO, baseUrl, http, storage });
    }

    public async getVideoUrlFromJWT(jwt: string): Promise<string> {

        const headers = new Headers();
        headers.append('video_token', jwt.replaceAll('~', '.'));
        
        const options = {
            method: HTTPMethod.GET,
            contentType: ContentType.JSON,
            hasAuth: true,
            customHeaders: headers,
        };

        const response = await this.load(
            this.getFullEndpoint(`/public-video${VideosApiPath.ROOT}`, {}),
            options,
        );
        
        if (!response.ok) {
            throw new Error(`Failed to get video ID JWT: ${response.statusText}`);
        }        
        return await response.text();
}
}

export { PublicVideosApi };
