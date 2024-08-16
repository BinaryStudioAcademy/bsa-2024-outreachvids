import {
    type RouteObject,
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

type Properties = {
    routes: RouteObject[];
};

const RouterProvider: React.FC<Properties> = ({ routes }) => (
    <LibraryRouterProvider router={createBrowserRouter(routes)} />
);

export { RouterProvider };
