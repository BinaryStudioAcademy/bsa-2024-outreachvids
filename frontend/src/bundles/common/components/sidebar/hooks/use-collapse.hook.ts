import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLayoutEffect,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { MID_SCREEN_SIZE } from '../constants/constants.js';
import { getSidebarState } from '../helpers/helpers.js';

const useCollapse = (): {
    isCollapsed: boolean;
    setToggle: () => void;
} => {
    const dispatch = useAppDispatch();
    const isCollapsed = useAppSelector(({ auth }) => auth.isSidebarCollapsed);

    const setToggle = useCallback((): void => {
        dispatch(authActions.toggleSidebar(!isCollapsed));
        void storage.set(
            StorageKey.IS_SIDEBAR_COLLAPSED,
            JSON.stringify(!isCollapsed),
        );
    }, [dispatch, isCollapsed]);

    const handleResize = useCallback((): void => {
        const isMobile = window.innerWidth < MID_SCREEN_SIZE;
        dispatch(authActions.toggleSidebar(isMobile));
        void storage.set(
            StorageKey.IS_SIDEBAR_COLLAPSED,
            JSON.stringify(isMobile),
        );
    }, [dispatch]);

    useLayoutEffect(() => {
        const dispatchSidebarState = async (): Promise<void> => {
            const flag = await getSidebarState();
            dispatch(authActions.toggleSidebar(flag));
        };

        void dispatchSidebarState();
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
