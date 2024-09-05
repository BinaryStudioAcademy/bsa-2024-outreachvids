import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

import { type Script } from '../types/studio.type.js';

type State = {
    player: {
        isPlaying: boolean;
    };
    scripts: Array<Script>;
};

const initialState: State = {
    player: {
        isPlaying: false,
    },
    scripts: [],
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

        setPlaying(state, action: PayloadAction<boolean>) {
            state.player.isPlaying = action.payload;
        },
    },
});

export { actions, name, reducer };
