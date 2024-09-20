import { Box } from '~/bundles/common/components/components.js';

import { Instruction } from '../components/components.js';
import styles from './styles.module.css';

const CreateAvatar: React.FC = () => {
    return (
        <Box className={styles['container']}>
            <Box className={styles['inner-container']}>
                <Instruction />
            </Box>
        </Box>
    );
};

export { CreateAvatar };