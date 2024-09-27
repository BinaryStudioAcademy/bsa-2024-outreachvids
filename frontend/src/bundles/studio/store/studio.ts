import {
    createTemplate,
    generateAllScriptsSpeech,
    generateScriptSpeech,
    generateScriptSpeechPreview,
    loadAvatars,
    loadPublicTemplates,
    loadUserTemplates,
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
    loadUserTemplates,
    createTemplate,
};

export { allActions as actions };
export { reducer } from './slice.js';
