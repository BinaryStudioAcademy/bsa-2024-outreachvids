import { createVideoUrl, deleteVideo, loadUserVideos, } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteVideo,
    loadUserVideos,
    createVideoUrl,
};

export { reducer } from './slice.js';
export { allActions as actions };
