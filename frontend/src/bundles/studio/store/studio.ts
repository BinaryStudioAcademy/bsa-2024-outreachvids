import {
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadPublicTemplates,
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
    loadPublicTemplates,
};

export { allActions as actions };
export { reducer } from './slice.js';
