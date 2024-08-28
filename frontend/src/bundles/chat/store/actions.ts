import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type DeleteChatRequestDto,
    type DeleteChatResponseDto,
    type GenerateTextRequestDto,
    type GenerateTextResponseDto,
} from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

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
    DeleteChatRequestDto,
    AsyncThunkConfig
>(`${sliceName}/delete-chat`, (deleteChatPayload, { extra }) => {
    const { chatApi } = extra;

    return chatApi.deleteChat(deleteChatPayload);
});

export { deleteChat, sendMessage };
