import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLayoutEffect,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { MD } from '../constants/constants.js';
import { getFlag } from '../helpers/helpers.js';

const useCollapse = (): {
    isCollapsed: boolean;
    setToggle: () => void;
} => {
    const dispatch = useAppDispatch();
    const isCollapsed = useAppSelector(({ auth }) => auth.isSidebarCollapsed);

    const setToggle = (): void => {
        dispatch(authActions.toggleSidebar(!isCollapsed));
        void storage.set(
            StorageKey.IS_SIDEBAR_COLLAPSED,
            JSON.stringify(!isCollapsed),
        );
    };

    const handleResize = useCallback((): void => {
        const isMobile = window.innerWidth < MD;
        dispatch(authActions.toggleSidebar(isMobile));
        void storage.set(
            StorageKey.IS_SIDEBAR_COLLAPSED,
            JSON.stringify(isMobile),
        );
    }, [dispatch]);

    useLayoutEffect(() => {
        const setFlag = async (): Promise<void> => {
            const flag = await getFlag();
            dispatch(authActions.toggleSidebar(flag));
        };

        void setFlag();
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return { isCollapsed, setToggle };
};

export { useCollapse };
