import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type VideoGetAllItemResponseDto } from '~/bundles/home/types/types.js';

import { deleteVideo, loadUserVideos } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    videos: Array<VideoGetAllItemResponseDto> | [];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    videos: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'home',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadUserVideos.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadUserVideos.fulfilled, (state, action) => {
            state.videos = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadUserVideos.rejected, (state) => {
            state.videos = [];
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(deleteVideo.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            const id = action.meta.arg;

            state.videos = state.videos.filter((video) => video.id !== id);
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(deleteVideo.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
