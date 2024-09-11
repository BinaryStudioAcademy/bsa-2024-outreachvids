import { loadUserVideos } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadUserVideos,
};

export { reducer } from './slice.js';
export { allActions as actions };
