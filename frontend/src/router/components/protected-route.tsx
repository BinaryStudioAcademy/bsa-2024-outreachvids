import { Navigate, RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const ProtectedRoute: React.FC = () => {
    // TODO: When persistence is implemented, the user will be taken from the store. The following line is temporary
    const user = true;

    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
