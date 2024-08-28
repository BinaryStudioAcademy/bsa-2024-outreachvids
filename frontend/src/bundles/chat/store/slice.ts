import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { sendMessage } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(sendMessage.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(sendMessage.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(sendMessage.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
