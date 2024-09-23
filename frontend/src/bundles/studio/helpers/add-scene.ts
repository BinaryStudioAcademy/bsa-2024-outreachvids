import { v4 as uuidv4 } from 'uuid';

import { MIN_SCENE_DURATION } from '~/bundles/studio/constants/constants.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import {
    type addSceneRequest,
    type addSceneResponse,
    type SelectedItem,
} from '~/bundles/studio/types/types.js';

import { calculateTotalMilliseconds } from './helpers.js';

const addScene = ({ scenes, rangeEnd }: addSceneRequest): addSceneResponse => {
    const scene = {
        id: uuidv4(),
        duration: MIN_SCENE_DURATION,
    };
    const updatedcenes = [...scenes, scene];

    const selectedItem: SelectedItem = { id: scene.id, type: RowNames.SCENE };
    const totalMilliseconds = calculateTotalMilliseconds(
        updatedcenes,
        rangeEnd,
    );
    rangeEnd = totalMilliseconds;

    return {
        scene,
        selectedItem,
        rangeEnd,
    };
};

export { addScene };
