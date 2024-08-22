import { NotFound } from '~/bundles/common/components/not-found/not-found.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

import { ProtectedRoute } from '../components/protected-route.js';

const protectedRoutes = {
    path: AppRoute.ROOT,
    element: <ProtectedRoute />,
    children: [
        //TODO Add protected routes here in element property and specify the correct path
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
