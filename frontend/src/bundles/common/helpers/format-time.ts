import { SECONDS_IN_MINUTE } from '../constants/constants.js';

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
    const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export { formatTime };
