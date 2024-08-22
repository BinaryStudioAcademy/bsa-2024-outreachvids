const isNullOrUndefined = <T>(
    value: T | null | undefined,
): value is null | undefined => value === undefined || value === null;

const isStringNullOrEmpty = (
    value: string | null | undefined,
): value is null | undefined =>
    isNullOrUndefined<string>(value) || value.trim().length === 0;

const isEmptyArray = <T>(value: T[]): boolean =>
    isNullOrUndefined<T[]>(value) || value.length === 0;

export { isEmptyArray, isNullOrUndefined, isStringNullOrEmpty };
