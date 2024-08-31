import { useEffect } from 'react';

import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { Box, Header } from '~/bundles/common/components/components.js';
import { useAppDispatch } from '~/bundles/common/hooks/hooks.js';

import { MainContent } from '../components/components.js';

const Home: React.FC = () => {
    // TODO: Move dispatch to place where current user is displayed
    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(authActions.loadCurrentUser());
    });
    return (
        <Box bg="background.900" height="100vh">
            <Header />
            {/* Sidebar */}
            <MainContent />
        </Box>
    );
};

export { Home };
