import { createSelector } from '@reduxjs/toolkit';
import { secondsToMilliseconds } from 'date-fns';

import { type RootState } from '~/bundles/common/types/types.js';

import { type Script } from '../types/types.js';

const selectScrips = (state: RootState): Script[] => state.studio.scripts;

const selectTotalDuration = createSelector([selectScrips], (scripts) => {
    const totalDuration = scripts.reduce(
        (total, script) => total + script.duration,
        0,
    );

    return secondsToMilliseconds(totalDuration);
});

export { selectTotalDuration };
