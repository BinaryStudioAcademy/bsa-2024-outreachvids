import { Navigate } from 'react-router-dom';

import { Center, SimpleGrid } from '~/bundles/common/components/components.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    if(dataStatus === DataStatus.FULFILLED) {
        return <Navigate to={AppRoute.ROOT} replace />;
    }

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <SimpleGrid columns={2} height="100vh">
            {/* TODO: Replace with valid loader */}
            {dataStatus === DataStatus.PENDING && (
                <p style={{ position: 'absolute', top: 0, color: 'white' }}>
                    Loading...
                </p>
            )}
            <Center bgColor="background.600">{getScreen(pathname)}</Center>
            {/* TODO: Add logo */}
            <Center bgColor="background.900">LOGO</Center>
        </SimpleGrid>
    );
};

export { Auth };
