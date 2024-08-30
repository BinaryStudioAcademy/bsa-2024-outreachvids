const formatTime = (time: number): string => {
    if (!time) {
        return '00:00';
    }

    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return hours
        ? `${hours}:${minutes.toString().padStart(2, '0')} `
        : `${minutes}:${seconds}`;
};

export { formatTime };
