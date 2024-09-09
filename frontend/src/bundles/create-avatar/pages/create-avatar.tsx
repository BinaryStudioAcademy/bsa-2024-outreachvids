import { Box } from '~/bundles/common/components/components.js';

import { Instruction } from '../components/components.js';

const CreateAvatar: React.FC = () => {
    return (
        <Box bg="background.50" height="calc(100vh - 75px)" p="50px">
            <Box
                sx={{
                    maxWidth: '870px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Instruction />
            </Box>
        </Box>
    );
};

export { CreateAvatar };
