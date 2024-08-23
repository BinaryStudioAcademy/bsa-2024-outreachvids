import { isNullOrUndefined } from '../helpers.js';

const isEmptyArray = <T>(value: T[]): boolean =>
    isNullOrUndefined<T[]>(value) || value.length === 0;

export { isEmptyArray };
