import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
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
    generateScriptSpeechPreview,
    renderAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
