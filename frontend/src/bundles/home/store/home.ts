import { actions } from './slice.js';

const allActions = {
    ...actions,
};

export { reducer } from './slice.js';
export { allActions as actions };
