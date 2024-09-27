import { v4 as uuidv4 } from 'uuid';

import {
    DEFAULT_SCRIPT_DURATION,
    DEFAULT_VOICE,
} from '~/bundles/studio/constants/constants.js';
import { PlayIconNames, RowNames } from '~/bundles/studio/enums/enums.js';
import {
    type addScriptRequest,
    type addScriptResponse,
    type Script,
    type SelectedItem,
} from '~/bundles/studio/types/types.js';

import { calculateTotalMilliseconds } from './helpers.js';

const addScript = ({
    text,
    scripts,
    rangeEnd,
}: addScriptRequest): addScriptResponse => {
    const script: Script = {
        id: uuidv4(),
        duration: DEFAULT_SCRIPT_DURATION,
        text: text,
        voice: DEFAULT_VOICE,
        iconName: PlayIconNames.READY,
        url: null,
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
