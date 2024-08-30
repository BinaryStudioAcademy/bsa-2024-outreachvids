import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

interface Properties {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    // TODO: When persistence is implemented, the user will be taken from the store. The following line is temporary
    const user = true;
    return user ? children : <Navigate to={AppRoute.SIGN_IN} replace />;
};

export { ProtectedRoute };
