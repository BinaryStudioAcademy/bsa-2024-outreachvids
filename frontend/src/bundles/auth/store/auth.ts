import { loadCurrentUser, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signIn,
    signUp,
    loadCurrentUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
