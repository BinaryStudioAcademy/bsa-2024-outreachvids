import { loadAvatars } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
};

export { allActions as actions };
export { reducer } from './slice.js';
