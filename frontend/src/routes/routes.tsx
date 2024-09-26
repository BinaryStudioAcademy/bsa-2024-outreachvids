import { App } from '~/app/app.js';
import { AIAvatars } from '~/bundles/ai-avatars/pages/ai-avatars.js';
import { Auth } from '~/bundles/auth/pages/auth.js';
import { ProtectedRoute } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { NotFound } from '~/bundles/common/pages/not-found/not-found.js';
import { CreateAvatar } from '~/bundles/create-avatar/pages/create-avatar.js';
import { Home } from '~/bundles/home/pages/home.js';
import { MyAvatar } from '~/bundles/my-avatar/pages/my-avatar.js';
import { Studio } from '~/bundles/studio/pages/studio.js';

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
                path: AppRoute.ROOT,
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: AppRoute.STUDIO,
                element: (
                    <ProtectedRoute>
                        <Studio />
                    </ProtectedRoute>
                ),
            },
            {
                path: AppRoute.MY_AVATAR,
                element: (
                    <ProtectedRoute>
                        <MyAvatar />
                    </ProtectedRoute>
                ),
            },
            {
                path: AppRoute.CREATE_AVATAR,
                element: (
                    <ProtectedRoute>
                        <CreateAvatar />
                    </ProtectedRoute>
                ),
            },
            {
                path: AppRoute.AI_AVATARS,
                element: (
                    <ProtectedRoute>
                        <AIAvatars />
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
