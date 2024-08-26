import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type UserGetAllItemResponseDto,
    type UserGetCurrentResponseDto,
} from '~/bundles/users/users.js';

import { loadAll, loadCurrent } from './actions.js';

type State = {
    users: UserGetAllItemResponseDto[];
    currentUser: UserGetCurrentResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    users: [],
    currentUser: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadCurrent.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadCurrent.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadCurrent.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
