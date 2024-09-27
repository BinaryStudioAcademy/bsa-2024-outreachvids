import {
    deleteVideo,     generateScriptSpeechPreview,
getJwt,
    loadUserVideos,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteVideo,
    loadUserVideos,
    getJwt,
    generateScriptSpeechPreview,
};

export { reducer } from './slice.js';
export { allActions as actions };
