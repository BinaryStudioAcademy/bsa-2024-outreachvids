import { type ValueOf } from 'shared';

import { Box, Icon } from '~/bundles/common/components/components.js';
import { StepStatus as StepStatusEnum } from '~/bundles/common/components/stepper/enums/enums.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

type Properties = {
    step: ValueOf<typeof StepStatusEnum>;
};

const StepStatus: React.FC<Properties> = ({ step }) => {
    switch (step) {
        case StepStatusEnum.COMPLETE: {
            return (
                <Box className={styles['complete']}>
                    <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepStatusEnum.ACTIVE: {
            return (
                <Box className={styles['active']}>
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepStatusEnum.INCOMPLETE: {
            return (
                <Box className={styles['incomplete']}>
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }
    }
};

export { StepStatus };
