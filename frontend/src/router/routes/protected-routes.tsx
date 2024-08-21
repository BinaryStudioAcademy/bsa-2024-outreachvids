import { Navigate } from 'react-router-dom';

import { App } from '~/app/app.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

import { ProtectedRoute } from '../components/protected-route.js';

const protectedRoutes = {
    path: AppRoute.ROOT,
    element: <ProtectedRoute />,
    children: [
        //TODO Add protected routes here in element property and specify the correct path
        {
            path: AppRoute.ROOT,
            element: <App />,
        },
        {
            path: AppRoute.STUDIO,
            element: <Studio />,
        },
        {
            path: AppRoute.ANY,
            element: <Navigate to={AppRoute.ROOT} replace />,
        },
    ],
};

export { protectedRoutes };
