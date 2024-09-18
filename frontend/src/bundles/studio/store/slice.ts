import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { millisecondsToSeconds, minutesToMilliseconds } from 'date-fns';
import { type Range, type Span } from 'dnd-timeline';
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

import { mockVoices } from '../components/video-menu/components/mock/voices-mock.js';
import { type MenuItems, PlayIconNames, RowNames } from '../enums/enums.js';
import {
    calculateTotalMilliseconds,
    getDestinationPointerValue,
    getNewItemIndexBySpan,
    reorderItemsByIndexes,
    setItemsSpan,
} from '../helpers/helpers.js';
import { type Script } from '../types/script.type.js';
import {
    type AvatarGetResponseDto,
    type DestinationPointer,
    type RowType,
    type Scene,
    type SceneAvatar,
    type TimelineItemWithSpan,
    type Voice,
} from '../types/types.js';
import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    loadAvatars,
    loadVoices,
    renderAvatar,
} from './actions.js';

type SelectedItem = {
    id: string;
    type: RowType;
};

type ItemActionPayload = {
    id: string;
    span: Span;
};

type DestinationPointerActionPayload = ItemActionPayload & {
    type: RowType;
};

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    avatars: Array<AvatarGetResponseDto> | [];
    player: {
        isPlaying: boolean;
        elapsedTime: number; // ms
    };
    range: Range;
    scenes: Array<Scene>;
    scripts: Array<Script>;
    selectedScriptId: string | null;
    videoSize: VideoPreviewT;
    voices: Voice[];
    videoName: string;
    ui: {
        destinationPointer: DestinationPointer | null;
        selectedItem: SelectedItem | null;
        menuActiveItem: ValueOf<typeof MenuItems> | null;
    };
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    avatars: [],
    player: {
        isPlaying: false,
        elapsedTime: 0,
    },
    range: { start: 0, end: minutesToMilliseconds(1) },
    scenes: [{ id: uuidv4(), duration: MIN_SCENE_DURATION }],
    scripts: [],
    selectedScriptId: null,
    videoSize: VideoPreview.LANDSCAPE,
    voices: [],
    videoName: 'Untitled Video',
    ui: {
        destinationPointer: null,
        selectedItem: null,
        menuActiveItem: null,
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
                voice: mockVoices.at(0),
                iconName: PlayIconNames.READY,
            };
            state.ui.selectedItem = { id: script.id, type: RowNames.SCRIPT };
            state.scripts.push(script);
            const totalMilliseconds = calculateTotalMilliseconds(
                state.scripts,
                state.range.end,
            );
            state.range.end = totalMilliseconds;
        },
        editScript(
            state,
            action: PayloadAction<
                Required<Pick<Script, 'id'>> & Partial<Script>
            >,
        ) {
            const { id, ...updatedScriptData } = action.payload;

            state.scripts = state.scripts.map((script) =>
                script.id === id ? { ...script, ...updatedScriptData } : script,
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
        reorderScripts(state, action: PayloadAction<ItemActionPayload>) {
            const { id, span } = action.payload;

            const previousActiveItemIndex = state.scripts.findIndex(
                (script) => script.id === id,
            );

            const newActiveItemIndex = getNewItemIndexBySpan(
                span,
                setItemsSpan(state.scripts),
            );

            state.scripts = reorderItemsByIndexes({
                oldIndex: previousActiveItemIndex,
                newIndex: newActiveItemIndex,
                items: state.scripts,
            });
        },
        selectScript(state, action) {
            state.selectedScriptId = action.payload;
        },
        setRange(state, action: PayloadAction<Range>) {
            state.range = action.payload;
        },
        addScene(state) {
            const scene = {
                id: uuidv4(),
                duration: MIN_SCENE_DURATION,
            };
            state.ui.selectedItem = { id: scene.id, type: RowNames.SCENE };
            state.scenes.push(scene);
            const totalMilliseconds = calculateTotalMilliseconds(
                state.scenes,
                state.range.end,
            );
            state.range.end = totalMilliseconds;
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
        deleteScene(state, action: PayloadAction<string>) {
            state.scenes = state.scenes.filter(
                (scenes) => scenes.id !== action.payload,
            );
        },
        changeVideoSize(state) {
            state.videoSize =
                state.videoSize === VideoPreview.LANDSCAPE
                    ? VideoPreview.PORTRAIT
                    : VideoPreview.LANDSCAPE;
        },
        setVideoSize(state, action: PayloadAction<VideoPreviewT>) {
            state.videoSize = action.payload;
        },
        setVideoName(state, action: PayloadAction<string>) {
            state.videoName = action.payload;
        },
        setDestinationPointer(
            state,
            action: PayloadAction<DestinationPointerActionPayload>,
        ) {
            const { id, span, type } = action.payload;

            const itemsWithSpan: Array<TimelineItemWithSpan> =
                type === RowNames.SCENE
                    ? setItemsSpan(state.scenes)
                    : setItemsSpan(state.scripts);

            const previousIndex = itemsWithSpan.findIndex(
                (item) => item.id === id,
            );
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
        selectItem(state, action: PayloadAction<SelectedItem>) {
            state.ui.selectedItem =
                state.ui.selectedItem?.id === action.payload.id
                    ? null
                    : action.payload;
        },
        addAvatarToScene(state, action: PayloadAction<SceneAvatar>) {
            const selectedItem = state.ui.selectedItem;
            if (!selectedItem || selectedItem.type !== RowNames.SCENE) {
                return;
            }

            state.scenes = state.scenes.map((scene) => {
                if (scene.id !== state.ui.selectedItem?.id) {
                    return scene;
                }

                return {
                    ...scene,
                    avatar: {
                        ...action.payload,
                    },
                };
            });
        },
        setMenuActiveItem(
            state,
            action: PayloadAction<ValueOf<typeof MenuItems> | null>,
        ) {
            state.ui.menuActiveItem = action.payload;
        },
        resetStudio(state) {
            // TODO: do not overwrite voices on reset
            return {
                ...initialState,
                avatars: state.avatars,
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(loadAvatars.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAvatars.fulfilled, (state, action) => {
            state.avatars = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAvatars.rejected, (state) => {
            state.avatars = [];
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(generateScriptSpeech.pending, (state, action) => {
            const { scriptId } = action.meta.arg;

            state.scripts = state.scripts.map((script) =>
                script.id === scriptId
                    ? { ...script, iconName: PlayIconNames.LOADING }
                    : script,
            );
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(generateScriptSpeech.fulfilled, (state, action) => {
            const { scriptId, audioUrl } = action.payload;

            state.scripts = state.scripts.map((script) => {
                if (script.id !== scriptId) {
                    return script;
                }

                return {
                    ...script,
                    url: audioUrl,
                    iconName: PlayIconNames.READY,
                };
            });
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(generateScriptSpeech.rejected, (state, action) => {
            const { scriptId } = action.meta.arg;

            state.scripts = state.scripts.map((script) =>
                script.id === scriptId
                    ? { ...script, iconName: PlayIconNames.READY }
                    : script,
            );
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadVoices.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadVoices.fulfilled, (state, action) => {
            state.voices = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadVoices.rejected, (state) => {
            state.voices = [];
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(generateAllScriptsSpeech.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(generateAllScriptsSpeech.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(generateAllScriptsSpeech.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(renderAvatar.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(renderAvatar.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(renderAvatar.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
