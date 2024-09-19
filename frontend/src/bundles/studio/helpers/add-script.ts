import { v4 as uuidv4 } from 'uuid';

import { MIN_SCRIPT_DURATION } from '../constants/constants.js';
import { PlayIconNames, RowNames } from '../enums/enums.js';
import {
    type addScriptRequest,
    type addScriptResponse,
    type Script,
    type SelectedItem,
} from '../types/types.js';
import { calculateTotalMilliseconds } from './helpers.js';

const addScript = ({
    text,
    scripts,
    rangeEnd,
    voice,
}: addScriptRequest): addScriptResponse => {
    const script: Script = {
        id: uuidv4(),
        duration: MIN_SCRIPT_DURATION,
        text: text,
        voice: voice,
        iconName: PlayIconNames.READY,
    };
    const updatedScripts = [...scripts, script];

    const selectedItem: SelectedItem = { id: script.id, type: RowNames.SCRIPT };
    const totalMilliseconds = calculateTotalMilliseconds(
        updatedScripts,
        rangeEnd,
    );
    rangeEnd = totalMilliseconds;

    return {
        script,
        selectedItem,
        rangeEnd,
    };
};

export { addScript };
