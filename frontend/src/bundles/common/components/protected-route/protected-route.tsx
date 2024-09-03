import { Loader, Navigate } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

interface Properties {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
    const dataStatus = useAppSelector((state) => state.auth.dataStatus);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading || dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    if (!user || dataStatus === DataStatus.REJECTED) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <>{children}</>;
};

export { ProtectedRoute };
