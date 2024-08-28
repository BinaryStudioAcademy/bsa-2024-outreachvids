import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ChatRequestDto, type ChatResponseDto } from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const sendMessage = createAsyncThunk<
    ChatRequestDto,
    ChatResponseDto,
    AsyncThunkConfig
>(`${sliceName}/send-message`, (sendMessagePayload, { extra }) => {
    const { chatApi } = extra;

    return chatApi.sendMessage(sendMessagePayload);
});

export { sendMessage };
