import { NotFound } from '~/bundles/auth/pages/not-found.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

import { ProtectedRoute } from '../components/protected-route.js';

const protectedRoutes = {
    path: AppRoute.ROOT,
    element: <ProtectedRoute />,
    children: [
        {
            path: AppRoute.STUDIO,
            element: <Studio />,
        },
        {
            path: AppRoute.ANY,
            element: <NotFound />,
        },
    ],
};

export { protectedRoutes };
