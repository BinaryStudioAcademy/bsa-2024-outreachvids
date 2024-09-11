type HasDuration = { duration: number };

const calculateTotalMilliseconds = (
    items: HasDuration[],
    rangeEnd: number,
): number => {
    const totalSeconds = items.reduce((sum, item) => sum + item.duration, 0);
    const totalMilliseconds = totalSeconds * 1000;
    return totalMilliseconds > rangeEnd ? totalMilliseconds : rangeEnd;
};

export { calculateTotalMilliseconds };
