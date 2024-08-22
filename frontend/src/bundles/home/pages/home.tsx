import { Box, Header } from '~/bundles/common/components/components.js';

import { MainContent } from '../components/components.js';

const Home: React.FC = () => {
    return (
        <>
            <Box bg="background.900" height="100vh">
                <Header />
                {/* Sidebar */}
                <MainContent />
            </Box>
        </>
    );
};

export { Home };
