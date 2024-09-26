const sanitizeJsonString = (input: string): string => {
    const match = input.match(/\[.*]/s);
    return match ? match[0].trim() : input.trim();
};

export { sanitizeJsonString };
