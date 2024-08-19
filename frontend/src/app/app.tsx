import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useLocation } from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const { pathname } = useLocation();

    const isAuth =
        pathname === AppRoute.SIGN_IN || pathname === AppRoute.SIGN_UP;

    return (
        <>
            {/* TODO Header */}
            {!isAuth && 'Header'}
            <RouterOutlet />
        </>
    );
};

export { App };
