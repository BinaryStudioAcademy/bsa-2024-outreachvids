import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    ComponentsProvider,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';
import { routes } from '~/routes/routes.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <ComponentsProvider>
                <RouterProvider routes={routes} />
            </ComponentsProvider>
        </StoreProvider>
    </StrictMode>,
);
