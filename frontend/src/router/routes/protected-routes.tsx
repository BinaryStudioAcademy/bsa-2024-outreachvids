import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { Home } from '~/bundles/home/pages/home.js';
import { MyAvatar } from '~/bundles/my-avatar/pages/my-avatar.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

import { ProtectedRoute } from '../components/protected-route.js';

const protectedRoutes = {
    path: AppRoute.ROOT,
    element: <ProtectedRoute />,
    children: [
        //TODO Add protected routes here in element property and specify the correct path
        {
            path: AppRoute.ROOT,
            element: <Home />,
        },
        {
            path: AppRoute.STUDIO,
            element: <Studio />,
        },
        {
            path: AppRoute.MY_AVATAR,
            element: <MyAvatar />,
        },
        {
            path: AppRoute.ANY,
            element: <Navigate to={AppRoute.ROOT} replace />,
        },
    ],
};

export { protectedRoutes };
