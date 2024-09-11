import { secondsToMilliseconds } from 'date-fns';

const calculateTotalMilliseconds = <T extends { duration: number }>(
    items: T[],
    rangeEnd: number,
): number => {
    const totalSeconds = items.reduce((sum, item) => sum + item.duration, 0);
    const totalMilliseconds = secondsToMilliseconds(totalSeconds);
    return totalMilliseconds > rangeEnd ? totalMilliseconds : rangeEnd;
};

export { calculateTotalMilliseconds };