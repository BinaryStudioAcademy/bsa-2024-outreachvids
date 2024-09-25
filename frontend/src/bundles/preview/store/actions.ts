import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

const getUrl = createAsyncThunk<Promise<string>, string, AsyncThunkConfig>(
    'preview/create-video-url',
    (payload, { extra }) => {
        const { publicVideosApi } = extra;
        return publicVideosApi.getVideoUrlFromJWT(payload);
    },
);

export { getUrl };
