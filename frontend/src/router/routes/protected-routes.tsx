import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { Studio } from '~/bundles/studio/pages/studio.js';
import { VideoEditor } from '~/bundles/video-editor/pages/video-editor.js';

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
            path: AppRoute.VIDEO_EDITOR,
            element: <VideoEditor />,
        },
        {
            path: AppRoute.ANY,
            element: <Navigate to={AppRoute.ROOT} replace />,
        },
    ],
};

export { protectedRoutes };
