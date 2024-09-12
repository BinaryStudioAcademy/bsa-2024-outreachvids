const sanitizeJsonString = (input: string): string => {
    const sanitized = input.replaceAll('`', '').replaceAll('json', '');
    return sanitized.trim();
};

export { sanitizeJsonString };
