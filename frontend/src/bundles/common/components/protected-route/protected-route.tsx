import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Loader } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';

import { useAppSelector } from '../../hooks/hooks.js';

interface Properties {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
    const dataStatus = useAppSelector((state) => state.auth.dataStatus);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading || dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    if (!user || dataStatus === DataStatus.REJECTED) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <>{children}</>;
};

export { ProtectedRoute };
