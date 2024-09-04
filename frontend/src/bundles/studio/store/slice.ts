import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

import { VideoPreview } from '~/bundles/common/enums/enums.js';
import { type VideoPreview as VideoPreviewT } from '~/bundles/common/types/types.js';

import { type Script } from '../types/studio.type.js';

type State = {
    scripts: Array<Script>;
    videoSize: VideoPreviewT;
};

const initialState: State = {
    scripts: [],
    videoSize: VideoPreview.LANDSCAPE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'studio',
    reducers: {
        addScript(state, action: PayloadAction<string>) {
            const script = {
                id: self.crypto.randomUUID(),
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
        changeVideoSize(state) {
            state.videoSize =
                state.videoSize === VideoPreview.LANDSCAPE
                    ? VideoPreview.PORTRAIT
                    : VideoPreview.LANDSCAPE;
        },
    },
});

export { actions, name, reducer };
