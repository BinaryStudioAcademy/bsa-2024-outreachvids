import { Navigate } from 'react-router-dom';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
// import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

const ProtectedRoute: React.FC = () => {
    // const user = useAppSelector((state) => state.auth.user);

    // TODO: for implementing persistence. The following line is temporary
    const user = true;

    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
