import { type ValueOf } from 'shared';

import { Box, Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { StepIcon as StepIconEnum } from '../../enums/enums.js';

type Properties = {
    step: ValueOf<typeof StepIconEnum>;
};

const StepIcon: React.FC<Properties> = ({ step }) => {
    switch (step) {
        case StepIconEnum.COMPLETE: {
            return (
                <Box backgroundColor="background.900" display="inline-flex">
                    <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepIconEnum.ACTIVE: {
            return (
                <Box
                    display="inline-flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="4px"
                    color="white"
                    border="2px solid"
                    borderColor="background.600"
                    borderRadius="50%"
                    backgroundColor="background.900"
                >
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }

        case StepIconEnum.INCOMPLETE: {
            return (
                <Box color="background.600" display="inline-flex">
                    <Icon as={IconName.CIRCLE} boxSize={3} />
                </Box>
            );
        }
    }
};

export { StepIcon };
