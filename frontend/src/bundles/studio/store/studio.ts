import { loadAvatars, renderAvatar } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAvatars,
    renderAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
