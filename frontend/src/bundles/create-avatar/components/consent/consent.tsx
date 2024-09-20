import { Button, Flex } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

const Instruction: React.FC = () => {
    return (
        <Flex className={styles['flex-container']}>
            <Flex className={styles['inner-flex']}>

            </Flex>
            <Button label="Next step" width="220px" />
        </Flex>
    );
};

export { Instruction };
