import { Navigate } from 'react-router-dom';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Loader,
    Overlay,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const ProtectedRoute: React.FC = () => {
    const dispatch = useAppDispatch();

    const [tokenStatus, setTokenStatus] = useState<ValueOf<typeof DataStatus>>(
        DataStatus.IDLE,
    );

    useEffect(() => {
        setTokenStatus(DataStatus.PENDING);

        void storage.get(StorageKey.TOKEN).then((token) => {
            if (token) {
                setTokenStatus(DataStatus.FULFILLED);
                return dispatch(authActions.loadCurrentUser());
            } else {
                setTokenStatus(DataStatus.REJECTED);
            }
        });
    }, [dispatch]);

    if (tokenStatus === DataStatus.IDLE || tokenStatus === DataStatus.PENDING) {
        return (
            <Overlay isOpen={true}>
                <Loader />
            </Overlay>
        );
    }

    if (tokenStatus === DataStatus.REJECTED) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
