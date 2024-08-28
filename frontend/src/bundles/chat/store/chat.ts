import { sendMessage } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    sendMessage,
};

export { allActions as actions };
export { reducer } from './slice.js';
