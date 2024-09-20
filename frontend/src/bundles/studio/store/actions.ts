import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAudioData } from '@remotion/media-utils';
import { type UpdateVideoRequestDto } from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type CreateVideoRequestDto,
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
    type RenderAvatarResponseDto,
    type RenderAvatarVideoRequestDto,
    type Script,
    type VideoGetAllItemResponseDto,
} from '~/bundles/studio/types/types.js';

import { name as sliceName } from './slice.js';

const loadAvatars = createAsyncThunk<
    AvatarGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-avatars`, (_, { extra }) => {
    const { avatarsApi } = extra;

    return avatarsApi.loadAvatars();
});

const loadVoices = createAsyncThunk<
    GetVoicesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-voices`, (_, { extra }) => {
    const { speechApi } = extra;

    return speechApi.loadVoices();
});

const generateScriptSpeech = createAsyncThunk<
    Required<Pick<Script, 'id'>> & Partial<Script>,
    GenerateSpeechRequestDto,
    AsyncThunkConfig
>(`${sliceName}/generate-script-speech`, (payload, { extra }) => {
    const { speechApi } = extra;

    return speechApi
        .generateScriptSpeech(payload)
        .then(({ scriptId, audioUrl }) => {
            return getAudioData(audioUrl).then(({ durationInSeconds }) => ({
                id: scriptId,
                duration: durationInSeconds,
                url: audioUrl,
            }));
        });
});

const generateScriptSpeechPreview = createAsyncThunk<
    GenerateSpeechResponseDto,
    GenerateSpeechRequestDto,
    AsyncThunkConfig
>(`${sliceName}/generate-script-speech-preview`, (payload, { extra }) => {
    const { speechApi } = extra;

    return speechApi.generateScriptSpeech(payload);
});

const generateAllScriptsSpeech = createAsyncThunk<
    Promise<void>,
    undefined,
    AsyncThunkConfig
>(
    `${sliceName}/generate-all-scripts-speech`,
    async (_, { getState, dispatch }) => {
        const state = getState();

        const scripts = state.studio.scripts
            .filter((script) => !script.url)
            .map(({ id, text, voice }) =>
                dispatch(
                    generateScriptSpeech({
                        scriptId: id,
                        text,
                        voiceName: voice?.shortName,
                    }),
                ),
            );

        await Promise.all(scripts);
    },
);

const renderAvatar = createAsyncThunk<
    RenderAvatarResponseDto,
    RenderAvatarVideoRequestDto,
    AsyncThunkConfig
>(`${sliceName}/render-avatar`, (payload, { extra }) => {
    const { avatarVideosApi } = extra;

    return avatarVideosApi.renderVideo(payload);
});

const saveVideo = createAsyncThunk<
    VideoGetAllItemResponseDto,
    CreateVideoRequestDto,
    AsyncThunkConfig
>(`${sliceName}/save-video`, (payload, { extra }) => {
    const { videosApi } = extra;

    return videosApi.saveVideo(payload);
});

const updateVideo = createAsyncThunk<
    VideoGetAllItemResponseDto,
    UpdateVideoRequestDto,
    AsyncThunkConfig
>(`${sliceName}/update-video`, (payload, { extra, getState }) => {
    const { videosApi } = extra;
    const state = getState();
    const { videoId } = state.studio;

    return videosApi.updateVideo(payload, videoId as string);
});

export {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadVoices,
    renderAvatar,
    saveVideo,
    updateVideo,
};
