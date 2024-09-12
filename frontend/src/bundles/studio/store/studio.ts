import { generateScriptSpeech, loadAvatars, renderAvatar } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    generateScriptSpeech,
    renderAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
