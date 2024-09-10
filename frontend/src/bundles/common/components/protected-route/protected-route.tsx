import {
    Loader,
    Navigate,
    Overlay,
} from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const { user, dataStatus } = useAppSelector((state) => state.auth);

    if (dataStatus === DataStatus.PENDING) {
        return (
            <Overlay isOpen>
                <Loader />
            </Overlay>
        );
    }

    if (dataStatus === DataStatus.REJECTED) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    if (user) {
        return <>{children}</>;
    }
};

export { ProtectedRoute };
