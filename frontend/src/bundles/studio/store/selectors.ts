import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '~/bundles/common/types/types.js';

import {
    type Script,
    type VideoGetAllItemResponseDto,
} from '../types/types.js';

const selectScrips = (state: RootState): Script[] => state.studio.scripts;

const selectVideos = (state: RootState): VideoGetAllItemResponseDto[] =>
    state.home.videos;

const selectTotalDuration = createSelector([selectScrips], (scripts) => {
    return scripts.reduce((total, script) => total + script.duration, 0);
});

const selectVideoDataById = createSelector(
    [selectVideos, (_, id: string): string => id],
    (videos, id) => {
        return videos.find((video) => video.id === id);
    },
);

export { selectTotalDuration, selectVideoDataById };
