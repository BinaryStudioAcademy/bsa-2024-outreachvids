import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { MD } from './constants/constants.js';

const useCollapse = (): {
    isCollapsed: boolean;
    setToggle: () => void;
} => {
    const isSidebarCollapsed = useAppSelector(
        ({ auth }) => auth.isSidebarCollapsed,
    );
    const dispatch = useAppDispatch();

    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSidebarCollapsed);

    const resize = useCallback((): void => {
        const isMobile = window.innerWidth < MD;
        setIsCollapsed(isMobile);
        dispatch(authActions.toggleSidebar(isMobile));
    }, [dispatch]);

    const setToggle = (): void => {
        const toggle = !isCollapsed;
        setIsCollapsed(toggle);
        dispatch(authActions.toggleSidebar(toggle));
    };

    useEffect(() => {
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [resize]);

    return { isCollapsed, setToggle };
};

export { useCollapse };
