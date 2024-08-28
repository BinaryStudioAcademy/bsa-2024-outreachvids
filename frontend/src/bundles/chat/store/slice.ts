import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { MessageSender } from '../enums/enums.js';
import { type Message } from '../types/types.js';
import { deleteChat, sendMessage } from './actions.js';

type State = {
    messages: Message[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    messages: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder.addCase(sendMessage.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const { payload } = action;

            state.dataStatus = DataStatus.FULFILLED;

            const aiMessage: Message = {
                id: state.messages.length + 2,
                sender: MessageSender.AI,
                text: payload.message,
                timeStamp: new Date(),
            };
            state.messages.push(aiMessage);
        });
        builder.addCase(sendMessage.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteChat.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteChat.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
