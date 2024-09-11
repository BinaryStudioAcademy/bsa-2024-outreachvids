import { loadAvatars, loadVoices } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    loadVoices,
};

export { allActions as actions };
export { reducer } from './slice.js';
