import { secondsToMilliseconds } from 'date-fns';

import {
    ADD_BUTTON_PADDING_MILLISECONDS,
    MAX_SCENES_BEFORE_RESIZE,
} from '~/bundles/studio/constants/constants.js';

const calculateTotalMilliseconds = <T extends { duration: number }>(
    items: T[],
    rangeEnd: number,
): number => {
    const totalSeconds = items.reduce((sum, item) => sum + item.duration, 0);
    const totalMilliseconds = secondsToMilliseconds(totalSeconds);
    if (items.length > MAX_SCENES_BEFORE_RESIZE) {
        return totalMilliseconds + ADD_BUTTON_PADDING_MILLISECONDS;
    }
    return totalMilliseconds >= rangeEnd
        ? totalMilliseconds + ADD_BUTTON_PADDING_MILLISECONDS
        : rangeEnd;
};

export { calculateTotalMilliseconds };
