import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserSignInResponseDto } from '~/bundles/users/users.js';

import { signIn, signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: UserSignInResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
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
        builder.addCase(signUp.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
