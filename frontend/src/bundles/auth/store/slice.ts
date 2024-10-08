import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserGetCurrentResponseDto } from '~/bundles/users/users.js';

import { loadCurrentUser, logout, signIn, signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserGetCurrentResponseDto | null;
    isSidebarCollapsed: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
    isSidebarCollapsed: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        toggleSidebar: (state, action: { payload: boolean }) => {
            state.isSidebarCollapsed = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.user = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });
        builder.addCase(loadCurrentUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadCurrentUser.rejected, (state) => {
            state.user = null;
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(logout.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(logout.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
