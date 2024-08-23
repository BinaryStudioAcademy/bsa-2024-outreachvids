import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { Navigate } from '~/bundles/common/hooks/hooks.js';

const ProtectedRoute: React.FC = () => {
    // TODO: When persistence is implemented, the user will be taken from the store. The following line is temporary
    const user = true;

    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
