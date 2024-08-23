import { isNullOrUndefined } from '../helpers.js';

const isStringNullOrEmpty = (
    value: string | null | undefined,
): value is null | undefined =>
    isNullOrUndefined<string>(value) || value.trim().length === 0;

export { isStringNullOrEmpty };
