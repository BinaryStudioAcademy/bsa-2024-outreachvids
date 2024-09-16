import { storage, StorageKey } from '~/framework/storage/storage.js';

import { MID_SCREEN_SIZE } from '../constants/constants.js';

const getSidebarState = async (): Promise<boolean> => {
    const value = await storage.get(StorageKey.IS_SIDEBAR_COLLAPSED);
    if (value) {
        return JSON.parse(value);
    }

    const isMobile = window.innerWidth < MID_SCREEN_SIZE;
    void storage.set(StorageKey.IS_SIDEBAR_COLLAPSED, JSON.stringify(isMobile));

    return isMobile;
};

export { getSidebarState };
