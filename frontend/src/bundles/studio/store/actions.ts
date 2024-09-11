import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type GetVoicesResponseDto,
} from '~/bundles/studio/types/types.js';

import { name as sliceName } from './slice.js';

const loadAvatars = createAsyncThunk<
    AvatarGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-avatars`, (_, { extra }) => {
    const { avatarsApi } = extra;

    return avatarsApi.loadAvatars();
});

const loadVoices = createAsyncThunk<
    GetVoicesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-voices`, (_, { extra }) => {
    const { speechApi } = extra;

    return speechApi.loadVoices();
});

export { loadAvatars, loadVoices };
