import { generateScriptSpeech, loadAvatars } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateScriptSpeech,
};

export { allActions as actions };
export { reducer } from './slice.js';
