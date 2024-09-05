import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserGetCurrentResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/enums/enums.js';

import { name as sliceName } from './slice.js';

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
    const { authApi, storage } = extra;
    const response = await authApi.signIn(signInPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
    }
    return response;
});

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi, storage } = extra;
    const response = await authApi.signUp(registerPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
    }
    return response;
});

const loadCurrentUser = createAsyncThunk<
    UserGetCurrentResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-current-user`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getCurrent();
});

const logout = createAsyncThunk<Promise<void>, undefined, AsyncThunkConfig>(
    `${sliceName}/logout`,
    async (_, { extra }) => {
        const { storage } = extra;

        await storage.drop(StorageKey.TOKEN);
    },
);

export { loadCurrentUser, logout, signIn, signUp };
