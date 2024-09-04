import {
    useAppSelector,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { MD } from './constants/constants.js';

const useCollapse = (): {
    isCollapsed: boolean;
    setToggle: () => void;
} => {
    const isSidebarCollapsed = useAppSelector(
        ({ auth }) => auth.isSidebarCollapsed,
    );

    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSidebarCollapsed);

    const resize = (): void => {
        const isMobile = window.innerWidth < MD;
        setIsCollapsed(isMobile);
        void storage.set(StorageKey.IS_COLLAPSED, JSON.stringify(isMobile));
    };

    const setToggle = (): void => {
        const toggle = !isCollapsed;
        setIsCollapsed(toggle);
        const flag = JSON.stringify(toggle);
        void storage.set(StorageKey.IS_COLLAPSED, flag);
    };

    useEffect(() => {
        setIsCollapsed(isSidebarCollapsed);

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [isSidebarCollapsed]);

    return { isCollapsed, setToggle };
};

export { useCollapse };
