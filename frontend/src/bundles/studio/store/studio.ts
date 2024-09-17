import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    loadAvatars,
    renderAvatar,
    saveVideo,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateAllScriptsSpeech,
    generateScriptSpeech,
    renderAvatar,
    saveVideo,
};

export { allActions as actions };
export { reducer } from './slice.js';
