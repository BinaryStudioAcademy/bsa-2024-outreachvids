import { formatTime } from '~/bundles/common/helpers/format-time.js';

import { MAX_PERCENT } from '../constants/max-percent.js';

type Properties = {
    played: number;
    durationInSeconds: number;
};

const getTime = ({ played, durationInSeconds }: Properties): string => {
    const currentSecond = Math.round(
        (played * durationInSeconds) / MAX_PERCENT,
    );

    const currentTime = formatTime(currentSecond);
    const duration = formatTime(durationInSeconds);

    return `${currentTime} : ${duration}`;
};

export { getTime };
