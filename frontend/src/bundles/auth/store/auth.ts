import { loadCurrentUser, logout, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signIn,
    signUp,
    loadCurrentUser,
    logout,
};

export { allActions as actions };
export { reducer } from './slice.js';
