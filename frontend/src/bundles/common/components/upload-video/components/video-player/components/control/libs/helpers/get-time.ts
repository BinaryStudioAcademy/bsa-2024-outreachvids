import { formatTime } from '~/bundles/common/helpers/format-time.js';

type Properties = {
    played: number;
    durationInSeconds: number;
};

const getTime = ({ played, durationInSeconds }: Properties): string => {
    const currentSecond = Math.round((played * durationInSeconds) / 100);

    const currentTime = formatTime(currentSecond);
    const duration = formatTime(durationInSeconds);

    return `${currentTime} : ${duration}`;
};

export { getTime };
