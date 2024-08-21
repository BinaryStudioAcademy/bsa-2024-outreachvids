import { Navigate } from 'react-router-dom';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const ProtectedRoute: React.FC = () => {
    // TODO: When the JWT is implemented and the token is stored in local storage, it should be activated.
    // const isAuth = !!localStorage.getItem('token');
    const isAuth = true;

    if (!isAuth) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <RouterOutlet />;
};

export { ProtectedRoute };
