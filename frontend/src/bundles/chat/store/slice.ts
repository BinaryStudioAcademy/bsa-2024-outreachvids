import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { MessageSender } from '../enums/enums.js';
import { type GenerateTextRequestDto, type Message } from '../types/types.js';
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
    reducers: {},
    extraReducers(builder) {
        builder.addCase(sendMessage.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(
            sendMessage.fulfilled,
            (state, { payload, meta: { arg } }) => {
                const requestPayload: GenerateTextRequestDto = arg;

                state.messages.push(
                    {
                        sender: MessageSender.USER,
                        text: requestPayload.message,
                    },
                    {
                        sender: MessageSender.AI,
                        text: payload.message,
                    },
                );
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addCase(sendMessage.rejected, (state, { meta: { arg } }) => {
            const requestPayload: GenerateTextRequestDto = arg;

            state.messages.push({
                sender: MessageSender.USER,
                text: requestPayload.message,
            });
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteChat.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteChat.fulfilled, (state) => {
            state.messages = [];
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
