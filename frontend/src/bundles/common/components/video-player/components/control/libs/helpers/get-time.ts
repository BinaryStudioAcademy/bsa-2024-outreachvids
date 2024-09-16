import { format, secondsToMilliseconds } from 'date-fns';

import { MAX_PERCENT } from '../constants/max-percent.js';

type Properties = {
    played: number;
    durationInSeconds: number;
};

const getTime = ({ played, durationInSeconds }: Properties): string => {
    const currentSecond = Math.round(
        (played * durationInSeconds) / MAX_PERCENT,
    );

    const currentTime = format(
        new Date(secondsToMilliseconds(currentSecond)),
        'mm:ss',
    );
    const duration = format(
        new Date(secondsToMilliseconds(durationInSeconds)),
        'mm:ss',
    );

    return `${currentTime} : ${duration}`;
};

export { getTime };
