import { BaseStorage } from './storage.package.js';

const storage = new BaseStorage(window.localStorage);

export { storage };
export { StorageKey } from './enums/enums.js';
export { type Storage } from './types/types.js';
