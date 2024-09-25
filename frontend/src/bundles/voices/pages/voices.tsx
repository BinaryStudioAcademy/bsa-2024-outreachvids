import {
    Box,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';
import { MainContent } from '~/bundles/voices/components/components.js';

const Voices: React.FC = () => {
    return (
        <Box bg="background.900" minHeight="100vh">
            <Header />
            <Sidebar>
                <MainContent />
            </Sidebar>
        </Box>
    );
};

export { Voices };
