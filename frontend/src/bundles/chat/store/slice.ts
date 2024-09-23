import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_SCENE_TITLE } from '~/bundles/chat/constants/constants.js';
import { MessageSender } from '~/bundles/chat/enums/enums.js';
import { sanitizeJsonString } from '~/bundles/chat/helpers/helpers.js';
import {
    type GenerateTextRequestDto,
    type Message,
} from '~/bundles/chat/types/types.js';
import {
    EMPTY_VALUE,
    LAST_ELEMENT_INDEX,
} from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    type ValueOf,
    type VideoScript,
} from '~/bundles/common/types/types.js';

import { deleteChat, sendMessage } from './actions.js';

type State = {
    messages: Message[];
    videoScripts: VideoScript[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    messages: [],
    videoScripts: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        generateVideoScript(state) {
            const messages = state.messages.filter(
                (message) => message.sender === MessageSender.AI,
            );

            if (!messages || messages.length === EMPTY_VALUE) {
                return;
            }

            const lastMessage = messages.at(LAST_ELEMENT_INDEX);
            if (!lastMessage) {
                return;
            }

            try {
                const sanitizedJson = sanitizeJsonString(lastMessage.text);
                const videoScripts: VideoScript[] = JSON.parse(sanitizedJson);

                state.videoScripts = videoScripts;
            } catch {
                state.videoScripts = [
                    {
                        title: DEFAULT_SCENE_TITLE,
                        description: lastMessage.text,
                    },
                ];
            }
        },
    },
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
                        text: payload.generatedText,
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
            state.videoScripts = [];
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteChat.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
