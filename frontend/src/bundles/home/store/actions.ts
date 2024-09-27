import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
    type VideoGetAllResponseDto,
} from '~/bundles/home/types/types.js';

import { name as sliceName } from './slice.js';

const loadUserVideos = createAsyncThunk<
    VideoGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-user-videos`, (_, { extra }) => {
    const { videosApi } = extra;

    return videosApi.loadUserVideos();
});

const deleteVideo = createAsyncThunk<Promise<void>, string, AsyncThunkConfig>(
    `${sliceName}/delete-video`,
    (payload, { extra }) => {
        const { videosApi } = extra;

        return videosApi.deleteVideo(payload);
    },
);

const getJwt = createAsyncThunk<Promise<string>, string, AsyncThunkConfig>(
    `${sliceName}/create-video-url`,
    (payload, { extra }) => {
        const { videosApi } = extra;
        return videosApi.getVideoIdJWT(payload);
    },
);

const loadVoices = createAsyncThunk<
    GetVoicesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-voices`, (_, { extra }) => {
    const { speechApi } = extra;

    return speechApi.loadVoices();
});

const generateScriptSpeechPreview = createAsyncThunk<
    GenerateSpeechResponseDto,
    GenerateSpeechRequestDto,
    AsyncThunkConfig
>(`${sliceName}/generate-script-speech-preview`, (payload, { extra }) => {
    const { speechApi } = extra;

    return speechApi.generateScriptSpeech(payload);
});

export { deleteVideo, generateScriptSpeechPreview, getJwt, loadUserVideos, loadVoices };
