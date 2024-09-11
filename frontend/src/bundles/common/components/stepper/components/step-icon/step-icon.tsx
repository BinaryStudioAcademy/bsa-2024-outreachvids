import { type ValueOf } from 'shared';

import { Box, Icon } from '~/bundles/common/components/components.js';
import { StepIcon as StepIconEnum } from '~/bundles/common/components/stepper/enums/enums.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

type Properties = {
    step: ValueOf<typeof StepIconEnum>;
};

const StepIcon: React.FC<Properties> = ({ step }) => {
    switch (step) {
        case StepIconEnum.COMPLETE: {
            return (
                <Box className={styles['complete']}>
                    <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepIconEnum.ACTIVE: {
            return (
                <Box className={styles['active']}>
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepIconEnum.INCOMPLETE: {
            return (
                <Box className={styles['incomplete']}>
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }
    }
};

export { StepIcon };
