import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserGetAllResponseDto,
    type UserGetCurrentResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const loadCurrent = createAsyncThunk<
    UserGetCurrentResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-current`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getCurrent();
});

export { loadAll, loadCurrent };
