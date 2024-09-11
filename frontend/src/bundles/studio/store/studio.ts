import { generateScriptSpeech, loadAvatars, loadVoices } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    loadVoices,
    generateScriptSpeech,
};

export { allActions as actions };
export { reducer } from './slice.js';
