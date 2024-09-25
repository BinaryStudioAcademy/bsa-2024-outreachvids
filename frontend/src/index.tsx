import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    ComponentsProvider,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { store } from '~/framework/store/store.js';
import { routes } from '~/routes/routes.js';

import { socket, SocketContext } from './bundles/common/context/socket.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <SocketContext.Provider value={socket}>
                <ComponentsProvider>
                    <RouterProvider routes={routes} />
                </ComponentsProvider>
            </SocketContext.Provider>
        </StoreProvider>
    </StrictMode>,
);
