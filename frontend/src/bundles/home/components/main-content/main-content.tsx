import { Box } from '~/bundles/common/components/components.js';

import { VideoSection } from '../components.js';

const MainContent: React.FC = () => {
    return (
        <Box bg="background.50" borderRadius="lg" margin="0 25px">
            <VideoSection />
            <VideoSection />
        </Box>
    );
};

export { MainContent };
