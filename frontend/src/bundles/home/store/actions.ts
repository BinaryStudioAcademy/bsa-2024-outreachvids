import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type VideoGetAllResponseDto } from '~/bundles/home/types/types.js';

import { name as sliceName } from './slice.js';

const loadUserVideos = createAsyncThunk<
    VideoGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-user-videos`, (_, { extra }) => {
    const { videosApi } = extra;

    return videosApi.loadUserVideos();
});

export { loadUserVideos };
