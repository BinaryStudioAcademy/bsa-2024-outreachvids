import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type RenderAvatarResponseDto,
    type RenderAvatarVideoRequestDto,
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

const renderAvatar = createAsyncThunk<
    RenderAvatarResponseDto,
    RenderAvatarVideoRequestDto,
    AsyncThunkConfig
>(`${sliceName}/render-avatar`, (payload, { extra }) => {
    const { avatarVideosApi } = extra;

    return avatarVideosApi.renderVideo(payload);
});

export { loadAvatars, renderAvatar };
