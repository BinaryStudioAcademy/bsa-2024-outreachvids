import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type DeleteChatResponseDto,
    type GenerateTextRequestDto,
    type GenerateTextResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const sendMessage = createAsyncThunk<
    GenerateTextResponseDto,
    GenerateTextRequestDto,
    AsyncThunkConfig
>(`${sliceName}/send-message`, (sendMessagePayload, { extra }) => {
    const { chatApi } = extra;

    return chatApi.sendMessage(sendMessagePayload);
});

const deleteChat = createAsyncThunk<
    DeleteChatResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/delete-chat`, (_, { extra }) => {
    const { chatApi } = extra;

    return chatApi.deleteChat();
});

export { deleteChat, sendMessage };
