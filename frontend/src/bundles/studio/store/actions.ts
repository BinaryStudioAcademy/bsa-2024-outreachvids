import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAudioData } from '@remotion/media-utils';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetVoicesResponseDto,
    type RenderAvatarResponseDto,
    type RenderAvatarVideoRequestDto,
    type Script,
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

export {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadVoices,
    renderAvatar,
};
