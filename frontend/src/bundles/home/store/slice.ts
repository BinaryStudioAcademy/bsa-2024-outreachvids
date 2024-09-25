import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type VideoGetAllItemResponseDto,
    type Voice,
} from '~/bundles/home/types/types.js';

import { deleteVideo, loadUserVideos, loadVoices } from './actions.js';

type VoicePlayer = {
    isPlaying: boolean;
    url: string | null;
};

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    videos: Array<VideoGetAllItemResponseDto> | [];
    voices: Voice[];
    voicePlayer: VoicePlayer;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    videos: [],
    voices: [],
    voicePlayer: {
        isPlaying: false,
        url: null,
    },
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'home',
    reducers: {
        toogleVoiceLike(state, action: PayloadAction<string>) {
            state.voices = state.voices.map((voice) => {
                const { shortName, isLiked } = voice;
                return shortName === action.payload
                    ? { ...voice, isLiked: !isLiked }
                    : voice;
            });
        },
        playVoice(state, action: PayloadAction<Partial<VoicePlayer>>) {
            state.voicePlayer = { ...state.voicePlayer, ...action.payload };
        },
    },
    extraReducers(builder) {
        builder.addCase(loadUserVideos.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadUserVideos.fulfilled, (state, action) => {
            state.videos = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadUserVideos.rejected, (state) => {
            state.videos = [];
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteVideo.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            const id = action.meta.arg;

            state.videos = state.videos.filter((video) => video.id !== id);
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteVideo.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadVoices.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadVoices.fulfilled, (state, action) => {
            state.voices = action.payload.items.map((voice) => ({
                ...voice,
                isLiked: false,
            }));
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadVoices.rejected, (state) => {
            state.voices = [];
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
