import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    ComponentsProvider,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';
import { theme } from '~/framework/theme/theme.js';
import { routes } from '~/router/routes.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <ComponentsProvider theme={theme}>
                <RouterProvider routes={routes} />
            </ComponentsProvider>
        </StoreProvider>
    </StrictMode>,
);
