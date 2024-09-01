import { format } from './format-time.js';

type Properties = {
    played: number;
    durationInSeconds: number;
};

const getTime = ({ played, durationInSeconds }: Properties): string => {
    const currentSecond = Math.round((played * durationInSeconds) / 100);

    const currentTime = format(currentSecond);
    const duration = format(durationInSeconds);

    return `${currentTime} : ${duration}`;
};

export { getTime };
