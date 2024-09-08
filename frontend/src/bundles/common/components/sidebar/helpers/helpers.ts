import { storage, StorageKey } from '~/framework/storage/storage.js';

import { MD } from '../constants/constants.js';

const getFlag = async (): Promise<boolean> => {
    const value = await storage.get(StorageKey.IS_COLLAPSED);
    if (value) {
        return JSON.parse(value);
    }

    const isMobile = window.innerWidth < MD;
    void storage.set(StorageKey.IS_COLLAPSED, JSON.stringify(isMobile));
    return isMobile;
};

export { getFlag };
