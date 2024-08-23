const isNullOrUndefined = <T>(
    value: T | null | undefined,
): value is null | undefined => value === undefined || value === null;

export { isNullOrUndefined };
