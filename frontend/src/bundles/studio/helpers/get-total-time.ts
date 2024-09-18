import { secondsToMilliseconds } from 'date-fns';

const calculateTotalMilliseconds = <T extends { duration: number }>(
    items: T[],
    rangeEnd: number,
): number => {
    const totalSeconds = items.reduce((sum, item) => sum + item.duration, 0);
    const totalMilliseconds = secondsToMilliseconds(totalSeconds);
    if (items.length > 4) {
        return totalMilliseconds + 6000;
    }
    return totalMilliseconds >= rangeEnd ? totalMilliseconds + 6000 : rangeEnd;
};

export { calculateTotalMilliseconds };
