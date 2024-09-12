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
    const isLoading =
        dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

    if (isLoading) {
        return (
            <Overlay isOpen>
                <Loader />
            </Overlay>
        );
    }

    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <>{children}</>;
};

export { ProtectedRoute };
