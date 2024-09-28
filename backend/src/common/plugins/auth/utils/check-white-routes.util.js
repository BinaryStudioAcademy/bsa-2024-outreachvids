const isRouteInWhiteList = (routesWhiteList, request) => {
    return routesWhiteList.some((route) => route.path === request.url && route.method === request.method);
};
export { isRouteInWhiteList };
