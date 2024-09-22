import { type Action, type Middleware } from '@reduxjs/toolkit';

import { actions as studioActions } from '~/bundles/studio/store/studio.js';

const CHANGE_DRAFT_ACTIONS = new Set<string>([
    studioActions.addAvatarToScene.type,
    studioActions.addScene.type,
    studioActions.addScript.type,
    studioActions.changeVideoSize.type,
    studioActions.deleteScript.type,
    studioActions.editScript.type,
    studioActions.reorderScenes.type,
    studioActions.reorderScripts.type,
    studioActions.resizeScene.type,
    studioActions.setVideoName.type,
    studioActions.setVideoSize.type,
]);

const isChangeDraftAction = (action: Action): boolean => {
    return CHANGE_DRAFT_ACTIONS.has(action.type);
};

const draftMiddleware: Middleware = (storeAPI) => {
    return (next) => (action) => {
        if (isChangeDraftAction(action as Action)) {
            storeAPI.dispatch(studioActions.setDraftSaved(false));
        }
        return next(action);
    };
};

export { draftMiddleware };
