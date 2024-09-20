import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAudioData } from '@remotion/media-utils';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type GenerateSpeechRequestDto,
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
                        voiceName: voice?.shortName as string,
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
    loadAvatars,
    renderAvatar,
};
