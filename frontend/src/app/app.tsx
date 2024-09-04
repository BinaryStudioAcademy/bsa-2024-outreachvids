import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { useAppDispatch, useEffect } from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(authActions.loadCurrentUser());
    });
    return (
        <>
            <RouterOutlet />
        </>
    );
};

export { App };
