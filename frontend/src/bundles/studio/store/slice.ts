import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

import { type Script } from '../types/studio.type.js';

type State = {
    scripts: Array<Script>;
};

const initialState: State = {
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
        deleteScript(state, action: PayloadAction<string>) {
            state.scripts = state.scripts.filter(
                (script) => script.id !== action.payload,
            );
        },
    },
});

export { actions, name, reducer };
