import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

import { useAppSelector } from '../../hooks/hooks.js';

interface Properties {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const user = useAppSelector((state) => state.auth.user);
    return user ? children : <Navigate to={AppRoute.SIGN_IN} replace />;
};

export { ProtectedRoute };
