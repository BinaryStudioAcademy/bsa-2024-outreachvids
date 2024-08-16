import { type StorageKey } from './enums/enums.js';
import { type Storage } from './types/types.js';

class BaseStorage implements Storage {
    private store: globalThis.Storage;

    public constructor(store: globalThis.Storage) {
        this.store = store;
    }

    public set(key: StorageKey, value: string): Promise<void> {
        this.store.setItem(key as string, value);

        return Promise.resolve();
    }

    public get<R = string>(key: StorageKey): Promise<R | null> {
        return Promise.resolve(this.store.getItem(key as string) as R);
    }

    public drop(key: StorageKey): Promise<void> {
        this.store.removeItem(key as string);

        return Promise.resolve();
    }

    public async has(key: StorageKey): Promise<boolean> {
        const value = await this.get(key);

        return Boolean(value);
    }
}

export { BaseStorage };
