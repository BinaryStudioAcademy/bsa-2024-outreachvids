import { Navigate } from 'react-router-dom';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

const ProtectedRoute: React.FC = () => {
    const dataStatus = useAppSelector((state) => state.auth.dataStatus);
    if (dataStatus !== DataStatus.FULFILLED) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
