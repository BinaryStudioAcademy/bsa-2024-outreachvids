import { createSelector } from '@reduxjs/toolkit';
import { secondsToMilliseconds } from 'date-fns';

import { type RootState } from '~/bundles/common/types/types.js';

import {
    type Script,
    type VideoGetAllItemResponseDto,
} from '../types/types.js';

const selectScrips = (state: RootState): Script[] => state.studio.scripts;

const selectVideos = (state: RootState): VideoGetAllItemResponseDto[] =>
    state.home.videos;

const selectTotalDuration = createSelector([selectScrips], (scripts) => {
    const totalDuration = scripts.reduce(
        (total, script) => total + script.duration,
        0,
    );

    return secondsToMilliseconds(totalDuration);
});

const selectVideoDataById = createSelector(
    [selectVideos, (_, id: string): string => id],
    (videos, id) => {
        return videos.find((video) => video.id === id);
    },
);

export { selectTotalDuration, selectVideoDataById };
