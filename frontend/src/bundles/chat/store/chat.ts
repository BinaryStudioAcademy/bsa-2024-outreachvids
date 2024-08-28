import { deleteChat, sendMessage } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    sendMessage,
    deleteChat,
};

export { allActions as actions };
export { reducer } from './slice.js';
