import { Auth } from '~/bundles/auth/pages/auth.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

const publicRoutes = [
    {
        path: AppRoute.SIGN_IN,
        element: <Auth />,
    },
    {
        path: AppRoute.SIGN_UP,
        element: <Auth />,
    },
];

export { publicRoutes };
