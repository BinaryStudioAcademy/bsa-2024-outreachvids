import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

import { ProtectedRoute } from '../components/protected-route.js';

const protectedRoutes = {
    path: AppRoute.ROOT,
    element: <ProtectedRoute />,
    children: [
        //TODO Add protected routes here in element property and specify the correct path
        {
            path: AppRoute.PROTECTED,
            element: (<div>test</div>)
        },
        {
            path: AppRoute.ANY,
            element: <Navigate to={AppRoute.ROOT} />
        },
    ]
};

export { protectedRoutes };
