import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { DataStatus, VideoPreview } from '~/bundles/common/enums/enums.js';
import {
    type ValueOf,
    type VideoPreview as VideoPreviewT,
} from '~/bundles/common/types/types.js';

import { type AvatarGetResponseDto, type Script } from '../types/types.js';
import { loadAvatars } from './actions.js';

type State = {
    player: {
        isPlaying: boolean;
        elapsedTime: number; // ms
        duration: number;
    };
    avatars: {
        dataStatus: ValueOf<typeof DataStatus>;
        items: Array<AvatarGetResponseDto> | [];
    };
    scripts: Array<Script>;
    videoSize: VideoPreviewT;
};

const initialState: State = {
    player: {
        isPlaying: false,
        elapsedTime: 0,
        duration: 80 * 1000, // Mocked data. Use the end of last scene later.
    },
    avatars: {
        dataStatus: DataStatus.IDLE,
        items: [],
    },
    scripts: [],
    videoSize: VideoPreview.LANDSCAPE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'studio',
    reducers: {
        addScript(state, action: PayloadAction<string>) {
            const script = {
                id: uuidv4(),
                text: action.payload,
            };

            state.scripts.push(script);
        },
        editScript(state, action: PayloadAction<Script>) {
            const { id, text } = action.payload;

            state.scripts = state.scripts.map((script) =>
                script.id === id ? { ...script, text } : script,
            );
        },
        deleteScript(state, action: PayloadAction<string>) {
            state.scripts = state.scripts.filter(
                (script) => script.id !== action.payload,
            );
        },

        setPlaying(state, action: PayloadAction<boolean>) {
            state.player.isPlaying = action.payload;
        },
        setElapsedTime(state, action: PayloadAction<number>) {
            state.player.elapsedTime = action.payload;
        },
        changeVideoSize(state) {
            state.videoSize =
                state.videoSize === VideoPreview.LANDSCAPE
                    ? VideoPreview.PORTRAIT
                    : VideoPreview.LANDSCAPE;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadAvatars.pending, (state) => {
            state.avatars.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAvatars.fulfilled, (state, action) => {
            state.avatars.items = action.payload.items;
            state.avatars.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAvatars.rejected, (state) => {
            state.avatars.items = [];
            state.avatars.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
