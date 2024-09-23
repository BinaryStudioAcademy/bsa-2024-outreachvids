import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { millisecondsToSeconds, minutesToMilliseconds } from 'date-fns';
import { type Range, type Span } from 'dnd-timeline';
import { v4 as uuidv4 } from 'uuid';

import {
    EMPTY_VALUE,
    FIRST_INDEX,
    LAST_INDEX_OFFSET,
} from '~/bundles/common/constants/constants.js';
import { DataStatus, VideoPreview } from '~/bundles/common/enums/enums.js';
import {
    type ValueOf,
    type VideoPreview as VideoPreviewT,
    type VideoScript,
} from '~/bundles/common/types/types.js';
import {
    DEFAULT_VOICE,
    MIN_SCENE_DURATION,
} from '~/bundles/studio/constants/constants.js';

import { type MenuItems, PlayIconNames, RowNames } from '../enums/enums.js';
import {
    addScene,
    addScript,
    calculateTotalMilliseconds,
    createDefaultAvatarFromRequest,
    getDestinationPointerValue,
    getNewItemIndexBySpan,
    reorderItemsByIndexes,
    setItemsSpan,
} from '../helpers/helpers.js';
import { type Script } from '../types/script.type.js';
import {
    type AvatarGetResponseDto,
    type CompositionScript,
    type DestinationPointer,
    type RowType,
    type Scene,
    type SceneAvatar,
    type SelectedItem,
    type TimelineItemWithSpan,
    type VideoGetAllItemResponseDto,
    type Voice,
} from '../types/types.js';
import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadVoices,
    renderAvatar,
    saveVideo,
    updateVideo,
} from './actions.js';

type ItemActionPayload = {
    id: string;
    span: Span;
};

type DestinationPointerActionPayload = ItemActionPayload & {
    type: RowType;
};

type ScriptPlayer = {
    isPlaying: boolean;
    url: string | null;
    duration: number | null;
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
    isVideoScriptsGenerationReady: boolean;
    isVideoScriptsGenerationPending: boolean;
    scripts: Array<Script>;
    selectedScriptId: string | null;
    videoSize: VideoPreviewT;
    videoName: string;
    isDraftSaved: boolean;
    videoId: string | null;
    voices: Voice[];
    ui: {
        destinationPointer: DestinationPointer | null;
        selectedItem: SelectedItem | null;
        menuActiveItem: ValueOf<typeof MenuItems> | null;
    };
    scriptPlayer: ScriptPlayer;
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
    isVideoScriptsGenerationReady: false,
    isVideoScriptsGenerationPending: false,
    selectedScriptId: null,
    videoSize: VideoPreview.LANDSCAPE,
    videoName: 'Untitled Video',
    isDraftSaved: true,
    videoId: null,
    voices: [],
    ui: {
        destinationPointer: null,
        selectedItem: null,
        menuActiveItem: null,
    },
    scriptPlayer: {
        isPlaying: false,
        url: null,
        duration: null,
    },
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'studio',
    reducers: {
        addScript(state, action: PayloadAction<string>) {
            const { payload } = action;
            const { scripts, range, ui } = state;
            const { selectedItem, rangeEnd, script } = addScript({
                text: payload,
                scripts,
                rangeEnd: range.end,
                voice: DEFAULT_VOICE,
            });

            ui.selectedItem = selectedItem;
            range.end = rangeEnd;
            scripts.push(script);
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
            const { scenes, range, ui } = state;
            const { selectedItem, rangeEnd, scene } = addScene({
                scenes,
                rangeEnd: range.end,
            });

            ui.selectedItem = selectedItem;
            range.end = rangeEnd;
            scenes.push(scene);
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
            const totalMilliseconds = calculateTotalMilliseconds(
                state.scenes,
                state.range.end,
            );
            state.range.end = totalMilliseconds;
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
            const totalMilliseconds = calculateTotalMilliseconds(
                state.scenes,
                state.range.end,
            );
            state.range.end = totalMilliseconds;
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
        setDraftSaved(state, action: PayloadAction<boolean>) {
            state.isDraftSaved = action.payload;
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
        playScript(state, action: PayloadAction<Partial<ScriptPlayer>>) {
            state.scriptPlayer = { ...state.scriptPlayer, ...action.payload };
        },
        resetStudio(state) {
            // TODO: do not overwrite voices on reset
            const {
                avatars,
                scripts,
                scenes,
                range,
                ui,
                isVideoScriptsGenerationReady,
                isVideoScriptsGenerationPending,
            } = state;
            const baseState = {
                ...initialState,
                avatars: avatars,
            };

            if (
                isVideoScriptsGenerationPending ||
                isVideoScriptsGenerationReady
            ) {
                return {
                    ...baseState,
                    scripts: scripts,
                    scenes: scenes,
                    range: range,
                    ui: ui,
                    isVideoScriptsGenerationPending:
                        isVideoScriptsGenerationPending,
                    isVideoScriptsGenerationReady:
                        isVideoScriptsGenerationReady,
                };
            }

            return baseState;
        },
        loadVideoData(
            state,
            action: PayloadAction<VideoGetAllItemResponseDto>,
        ) {
            const { id, name, composition } = action.payload;

            state.videoName = name;
            state.videoId = id;
            state.scenes = composition.scenes;
            state.scripts = composition.scripts.map(
                (script: CompositionScript) => {
                    const voice = state.voices.find(
                        (voice) => voice.name === script.voiceName,
                    );

                    return {
                        ...script,
                        iconName: PlayIconNames.READY,
                        voice: voice ?? DEFAULT_VOICE,
                        url: null,
                    };
                },
            );
        },
        addGeneratedVideoScript(
            state,
            action: PayloadAction<Array<VideoScript>>,
        ) {
            try {
                state.isVideoScriptsGenerationPending = true;

                let index = EMPTY_VALUE;
                const { payload } = action;
                const { avatars, scripts, scenes, range } = state;
                const firstScene = scenes[FIRST_INDEX];
                const firstAvatar = avatars[FIRST_INDEX];
                const defaultAvatar =
                    createDefaultAvatarFromRequest(firstAvatar);
                const lastIndex = payload.length - LAST_INDEX_OFFSET;

                if (firstScene && defaultAvatar) {
                    firstScene.avatar = defaultAvatar;
                }
                for (const { description } of payload) {
                    const { rangeEnd, script } = addScript({
                        text: description,
                        scripts,
                        rangeEnd: range.end,
                        voice: DEFAULT_VOICE,
                    });
                    scripts.push(script);
                    range.end = rangeEnd;

                    if (index < lastIndex) {
                        const { scene } = addScene({
                            scenes,
                            rangeEnd: rangeEnd,
                        });

                        if (defaultAvatar) {
                            scene.avatar = defaultAvatar;
                        }

                        scenes.push(scene);
                    }
                    index++;
                }
            } finally {
                state.isVideoScriptsGenerationReady = true;
                state.isVideoScriptsGenerationPending = false;
            }
        },
        recalculateScenesDurationForScript(state) {
            let index = EMPTY_VALUE;
            const { scenes, scripts } = state;
            for (const { duration } of scripts) {
                const scene = scenes[index];
                if (!scene) {
                    continue;
                }

                scene.duration = Math.round(duration);
                index++;
            }
        },
        setVideoScriptToPending(state) {
            state.isVideoScriptsGenerationPending = true;
        },
        setVideoScriptToComplete(state) {
            state.isVideoScriptsGenerationPending = false;
            state.isVideoScriptsGenerationReady = false;
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
            const { id } = action.payload;

            state.scripts = state.scripts.map((script) => {
                if (script.id !== id) {
                    return script;
                }

                return {
                    ...script,
                    ...action.payload,
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
        builder.addCase(generateScriptSpeechPreview.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(generateScriptSpeechPreview.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(generateScriptSpeechPreview.rejected, (state) => {
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
        builder.addCase(renderAvatar.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(renderAvatar.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(renderAvatar.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(saveVideo.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(saveVideo.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.videoId = action.payload.id;
            state.isDraftSaved = true;
        });
        builder.addCase(saveVideo.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.videoId = null;
            state.isDraftSaved = false;
        });
        builder.addCase(updateVideo.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(updateVideo.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.isDraftSaved = true;
        });
        builder.addCase(updateVideo.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.isDraftSaved = false;
        });
    },
});

export { actions, name, reducer };
