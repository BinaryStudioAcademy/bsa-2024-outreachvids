import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    ComponentsProvider,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { Home } from '~/bundles/home/pages/home.js';
import { Studio } from '~/bundles/studio/pages/studio.js';
import { store } from '~/framework/store/store.js';
import { theme } from '~/framework/theme/theme.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.ROOT,
                element: <Home />,
            },
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
                element: <Studio />,
            },
        ],
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <ComponentsProvider theme={theme}>
                <RouterProvider routes={routes} />
            </ComponentsProvider>
        </StoreProvider>
    </StrictMode>,
);
