import { Box } from '~/bundles/common/components/components.js';

import { Instruction } from '../components/components.js';
import styles from './create-avatar.module.css';

const CreateAvatar: React.FC = () => {
    return (
        <Box className={styles['container']}>
            <Box className={styles['innerContainer']}>
                <Instruction />
            </Box>
        </Box>
    );
};

export { CreateAvatar };
