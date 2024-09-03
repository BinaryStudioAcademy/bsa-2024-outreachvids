import { SECONDS_IN_MINUTE, TIME_PADDING } from '../constants/constants.js';

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
    const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);
    return `${String(minutes).padStart(TIME_PADDING, '0')}:${String(seconds).padStart(TIME_PADDING, '0')}`;
};

export { formatTime };
