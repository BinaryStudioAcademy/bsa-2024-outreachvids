import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    loadAvatars,
    loadVoices,
    renderAvatar,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateAllScriptsSpeech,
    loadVoices,
    generateScriptSpeech,
    renderAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
