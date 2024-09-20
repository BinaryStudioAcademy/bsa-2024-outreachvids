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
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateAllScriptsSpeech,
    loadVoices,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    renderAvatar,
    saveVideo,
    updateVideo,
};

export { allActions as actions };
export { reducer } from './slice.js';
