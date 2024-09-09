const isFileSizeValid = (file: File, maxSize: number): boolean => {
    return file.size <= maxSize;
};

export { isFileSizeValid };
