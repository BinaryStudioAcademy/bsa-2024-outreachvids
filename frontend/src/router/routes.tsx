import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { NotFound } from '~/bundles/common/pages/not-found/not-found.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

import { ProtectedRoute } from '../bundles/common/components/components.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
            },
            {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
            },
            {
                path: AppRoute.STUDIO,
                element: (
                    <ProtectedRoute>
                        <Studio />,
                    </ProtectedRoute>
                ),
            },
            {
                path: AppRoute.ANY,
                element: <NotFound />,
            },
        ],
    },
];

export { routes };
