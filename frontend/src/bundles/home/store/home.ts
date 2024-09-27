import {
    deleteVideo,
    generateScriptSpeechPreview,
    loadUserVideos,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteVideo,
    loadUserVideos,
    generateScriptSpeechPreview,
};

export { reducer } from './slice.js';
export { allActions as actions };
