import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyTokenAndLoadUser = async (): Promise<void> => {
            const hasToken = await storage.has(StorageKey.TOKEN);

            if (hasToken) {
                void dispatch(authActions.loadCurrentUser());
            } else {
                navigate(AppRoute.SIGN_IN);
            }
        };

        void verifyTokenAndLoadUser();
    }, [dispatch, navigate]);
    return (
        <>
            <RouterOutlet />
        </>
    );
};

export { App };
