import {
    Box,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';

import { MainContent } from '../components/components.js';

const Home: React.FC = () => {
    return (
        <Box bg="background.900" minHeight="100vh">
            <Header />
            <Sidebar>
                <MainContent />
            </Sidebar>
        </Box>
    );
};

export { Home };
