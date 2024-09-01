const format = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const sec = date.getUTCSeconds().toString().padStart(2, '0');
    return hours
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${sec}`
        : `${minutes}:${sec}`;
};

export { format };
