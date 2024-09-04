import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type AvatarGetResponseDto, type Script } from '../types/types.js';
import { loadAvatars } from './actions.js';

type State = {
    avatars: {
        dataStatus: ValueOf<typeof DataStatus>;
        items: Array<AvatarGetResponseDto> | [];
    };
    scripts: Array<Script>;
};

const initialState: State = {
    avatars: {
        dataStatus: DataStatus.IDLE,
        items: [],
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