import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { useAppDispatch, useEffect } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const verifyTokenAndLoadUser = async (): Promise<void> => {
            const hasToken = await storage.has(StorageKey.TOKEN);

            if (hasToken) {
                void dispatch(authActions.loadCurrentUser());
            }
        };

        void verifyTokenAndLoadUser();
    }, [dispatch]);
    return (
        <>
            <RouterOutlet />
        </>
    );
};

export { App };
