import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    loadAvatars,
    renderAvatar,
    saveVideo,
    updateVideo,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateAllScriptsSpeech,
    generateScriptSpeech,
    renderAvatar,
    saveVideo,
    updateVideo,
};

export { allActions as actions };
export { reducer } from './slice.js';
