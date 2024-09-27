import { baseHttp } from '~/common/http/http.js';

import { ImageApi } from './image-base.js';

const imageApi = new ImageApi({ http: baseHttp });

export { imageApi };
