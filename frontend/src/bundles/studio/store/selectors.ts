import { createSelector } from '@reduxjs/toolkit';
import { secondsToMilliseconds } from 'date-fns';

import { type RootState } from '~/bundles/common/types/types.js';

import { type Scene } from '../types/types.js';

const selectScenes = (state: RootState): Scene[] => state.studio.scenes;

const selectTotalDuration = createSelector([selectScenes], (scenes) => {
    const totalDuration = scenes.reduce(
        (total, scene) => total + scene.duration,
        0,
    );

    return secondsToMilliseconds(totalDuration);
});

export { selectTotalDuration };
