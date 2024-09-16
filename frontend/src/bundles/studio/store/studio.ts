import {
    generateScriptSpeech,
    loadAvatars,
    loadVoices,
    renderAvatar,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    loadVoices,
    generateScriptSpeech,
    renderAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
