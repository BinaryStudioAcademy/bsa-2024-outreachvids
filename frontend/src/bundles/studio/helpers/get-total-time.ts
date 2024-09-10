const calculateTotalMilliseconds = (scripts: { duration: number }[], rangeEnd: number): number => {
    const totalSeconds = scripts.reduce(
        (sum, script) => sum + script.duration,
        0,
    );
    const totalMilliseconds = totalSeconds * 1000;
    return totalMilliseconds > rangeEnd ? totalMilliseconds : rangeEnd;
};

export { calculateTotalMilliseconds };
