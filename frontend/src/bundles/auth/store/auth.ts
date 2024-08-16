import { signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
};

export { allActions as actions };
export { reducer } from './slice.js';
