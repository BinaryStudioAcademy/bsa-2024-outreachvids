import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type VideoGetAllResponseDto } from '~/bundles/home/types/types.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    videos: VideoGetAllResponseDto | [];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    videos: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'home',
    reducers: {},
});

export { actions, name, reducer };
