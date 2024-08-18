import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const signIn = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, (signInPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signIn(signInPayload);
});

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signUp(registerPayload);
});

export { signIn, signUp };
