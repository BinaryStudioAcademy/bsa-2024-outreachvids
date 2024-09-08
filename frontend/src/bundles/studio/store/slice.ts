import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { millisecondsToSeconds } from 'date-fns';
import { type Span } from 'dnd-timeline';
import { v4 as uuidv4 } from 'uuid';

import { DataStatus, VideoPreview } from '~/bundles/common/enums/enums.js';
import {
    type ValueOf,
    type VideoPreview as VideoPreviewT,
} from '~/bundles/common/types/types.js';
import {
    MIN_SCENE_DURATION,
    MIN_SCRIPT_DURATION,
} from '~/bundles/studio/constants/constants.js';

import { RowNames } from '../enums/enums.js';
import {
    getDestinationPointerValue,
    getNewItemIndexBySpan,
    reorderItemsByIndexes,
    setItemsSpan,
} from '../helpers/helpers.js';
import {
    type AvatarGetResponseDto,
    type DestinationPointer,
    type RowType,
    type Scene,
    type Script,
} from '../types/types.js';
import { loadAvatars } from './actions.js';

type ItemActionPayload = {
    id: string;
    span: Span;
};

type DestinationPointerActionPayload = ItemActionPayload & {
    type: RowType;
};

type State = {
    avatars: {
        dataStatus: ValueOf<typeof DataStatus>;
        items: Array<AvatarGetResponseDto> | [];
    };
    scenes: Array<Scene>;
    scripts: Array<Script>;
    videoSize: VideoPreviewT;
    ui: {
        destinationPointer: DestinationPointer | null;
    };
};

const initialState: State = {
    avatars: {
        dataStatus: DataStatus.IDLE,
        items: [],
    },
    scenes: [{ id: uuidv4(), duration: MIN_SCENE_DURATION }],
    scripts: [],
    videoSize: VideoPreview.LANDSCAPE,
    ui: {
        destinationPointer: null,
    },
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'studio',
    reducers: {
        addScript(state, action: PayloadAction<string>) {
            const script = {
                id: uuidv4(),
                duration: MIN_SCRIPT_DURATION,
                text: action.payload,
            };

            state.scripts.push(script);
        },
        editScript(state, action: PayloadAction<Omit<Script, 'duration'>>) {
            const { id, text } = action.payload;

            state.scripts = state.scripts.map((script) =>
                script.id === id
                    ? { ...script, text, duration: MIN_SCRIPT_DURATION }
                    : script,
            );
        },
        deleteScript(state, action: PayloadAction<string>) {
            state.scripts = state.scripts.filter(
                (script) => script.id !== action.payload,
            );
        },
        addScene(state) {
            const scene = {
                id: uuidv4(),
                duration: MIN_SCENE_DURATION,
            };

            state.scenes.push(scene);
        },
        resizeScene(state, action: PayloadAction<ItemActionPayload>) {
            const { id, span } = action.payload;

            state.scenes = state.scenes.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                const duration = millisecondsToSeconds(span.end - span.start);

                return {
                    ...item,
                    duration,
                };
            });
        },
        reorderScenes(state, action: PayloadAction<ItemActionPayload>) {
            const { id, span } = action.payload;

            const previousActiveItemIndex = state.scenes.findIndex(
                (scene) => scene.id === id,
            );

            const newActiveItemIndex = getNewItemIndexBySpan(
                span,
                setItemsSpan(state.scenes),
            );

            state.scenes = reorderItemsByIndexes({
                oldIndex: previousActiveItemIndex,
                newIndex: newActiveItemIndex,
                items: state.scenes,
            });
        },
        changeVideoSize(state) {
            state.videoSize =
                state.videoSize === VideoPreview.LANDSCAPE
                    ? VideoPreview.PORTRAIT
                    : VideoPreview.LANDSCAPE;
        },
        updateDestinationPointer(
            state,
            action: PayloadAction<DestinationPointer>,
        ) {
            state.ui.destinationPointer = action.payload;
        },
        setDestinationPointer(
            state,
            action: PayloadAction<DestinationPointerActionPayload>,
        ) {
            const { id, span, type } = action.payload;

            const items =
                type === RowNames.SCENE ? state.scenes : state.scripts;
            const itemsWithSpan = setItemsSpan(items);

            const previousIndex = items.findIndex((item) => item.id === id);
            const newIndex = getNewItemIndexBySpan(span, itemsWithSpan);

            const destinationPointer = {
                type,
                value: getDestinationPointerValue({
                    oldIndex: previousIndex,
                    newIndex: newIndex,
                    items: itemsWithSpan,
                }),
            };

            state.ui.destinationPointer = destinationPointer;
        },
        removeDestinationPointer(state) {
            state.ui.destinationPointer = null;
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
