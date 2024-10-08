import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAudioData } from '@remotion/media-utils';
import { type UpdateVideoRequestDto } from 'shared';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type AvatarGetAllResponseDto,
    type CreateTemplateResponseDto,
    type CreateVideoRequestDto,
    type GenerateSpeechRequestDto,
    type GenerateSpeechResponseDto,
    type GetTemplatesResponseDto,
    type GetVoicesResponseDto,
    type RenderAvatarResponseDto,
    type Script,
    type VideoGetAllItemResponseDto,
} from '~/bundles/studio/types/types.js';

import { getVoicesConfigs } from '../helpers/helpers.js';
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
    undefined,
    AsyncThunkConfig
>(`${sliceName}/render-avatar`, (_, { extra, getState }) => {
    const { avatarVideosApi } = extra;
    const { scripts, scenes, videoName, videoId, videoSize } =
        getState().studio;
    return avatarVideosApi.renderVideo({
        composition: {
            scenes,
            scripts: getVoicesConfigs(scripts),
            videoOrientation: videoSize,
        },
        name: videoName,
        ...(videoId && { videoId }),
    });
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

const loadPublicTemplates = createAsyncThunk<
    GetTemplatesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-public-templates`, (_, { extra }) => {
    const { templatesApi } = extra;

    return templatesApi.loadPublicTemplates();
});

const loadUserTemplates = createAsyncThunk<
    GetTemplatesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-user-templates`, (_, { extra }) => {
    const { templatesApi } = extra;

    return templatesApi.loadUserTemplates();
});

const createTemplate = createAsyncThunk<
    CreateTemplateResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/create-template`, (_, { extra, getState }) => {
    const { templatesApi } = extra;
    const { scripts, scenes, videoName, videoSize } = getState().studio;

    return templatesApi.createTemplate({
        composition: {
            scenes,
            scripts: getVoicesConfigs(scripts),
            videoOrientation: videoSize,
        },
        name: videoName,
    });
});

export {
    createTemplate,
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadPublicTemplates,
    loadUserTemplates,
    loadVoices,
    renderAvatar,
    saveVideo,
    updateVideo,
};
