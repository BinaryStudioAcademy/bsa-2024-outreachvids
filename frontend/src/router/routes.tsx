import { App } from '~/app/app.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

import { protectedRoutes } from './routes/protected-routes.js';
import { publicRoutes } from './routes/public-routes.js';

const routes = [{
    path: AppRoute.ROOT,
    element: <App />,
    children: [
        protectedRoutes,
        ...publicRoutes,
    ],
}];

export { routes };
