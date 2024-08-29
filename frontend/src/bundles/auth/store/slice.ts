import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserGetCurrentResponseDto } from '~/bundles/users/users.js';

import { loadCurrentUser, signIn, signUp } from './actions.js';

type State = {
    authDataStatus: ValueOf<typeof DataStatus>;
    userDataStatus: ValueOf<typeof DataStatus>;
    user: UserGetCurrentResponseDto | null;
};

const initialState: State = {
    authDataStatus: DataStatus.IDLE,
    userDataStatus: DataStatus.IDLE,
    user: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
            state.authDataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state) => {
            state.authDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.user = null;
            state.authDataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signUp.pending, (state) => {
            state.authDataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.authDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.authDataStatus = DataStatus.REJECTED;
            state.user = null;
        });
        builder.addCase(loadCurrentUser.pending, (state) => {
            state.userDataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.userDataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadCurrentUser.rejected, (state) => {
            state.userDataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
