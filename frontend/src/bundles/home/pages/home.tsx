import {
    BellIcon,
    Box,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';

import { MainContent } from '../components/components.js';

const Home: React.FC = () => {
    return (
        <Box bg="background.900" height="100vh">
            <Header right={<BellIcon boxSize="1.5em" color="white" />} />
            <Sidebar>
                <MainContent />
            </Sidebar>
        </Box>
    );
};

export { Home };
