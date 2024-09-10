const sanitizeJsonString = (input: string): string => {
    let sanitized = input.replaceAll('`', '');
    sanitized = sanitized.replaceAll('json', '');
    return sanitized.trim();
};

export { sanitizeJsonString };
