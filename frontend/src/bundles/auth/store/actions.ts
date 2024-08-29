import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

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
>(`${sliceName}/sign-in`, async (signInPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;
    const response = await authApi.signIn(signInPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
        await dispatch(loadCurrentUser()).then(unwrapResult);
    }
    return response;
});

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;
    const response = await authApi.signUp(registerPayload);
    if (response.token) {
        await storage.set(StorageKey.TOKEN, response.token);
        await dispatch(loadCurrentUser()).then(unwrapResult);
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

export { loadCurrentUser, signIn, signUp };
