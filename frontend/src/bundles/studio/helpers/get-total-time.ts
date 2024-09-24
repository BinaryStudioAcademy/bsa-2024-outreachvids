import {
    ADD_BUTTON_PADDING_MILLISECONDS,
    MAX_SCENES_BEFORE_RESIZE,
} from '~/bundles/studio/constants/constants.js';

const calculateTotalMilliseconds = <T extends { duration: number }>(
    items: T[],
    rangeEnd: number,
): number => {
    const totalMilliseconds = items.reduce(
        (sum, item) => sum + item.duration,
        0,
    );

    if (items.length > MAX_SCENES_BEFORE_RESIZE) {
        return totalMilliseconds + ADD_BUTTON_PADDING_MILLISECONDS;
    }
    return totalMilliseconds >= rangeEnd
        ? totalMilliseconds + ADD_BUTTON_PADDING_MILLISECONDS
        : rangeEnd;
};

export { calculateTotalMilliseconds };
