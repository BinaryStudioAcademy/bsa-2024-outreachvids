import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ValueOf } from 'shared';

import { Box, Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { Step } from '../../enums/enums.js';

type Properties = {
    step: ValueOf<typeof Step>;
};

const StepIcon: React.FC<Properties> = ({ step }) => {
    if (step === Step.COMPLETED) {
        return (
            <Box>
                <Box backgroundColor="background.900" display="inline-flex">
                    <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
                </Box>
            </Box>
        );
    }

    if (step === Step.CURRENT || step === Step.LAST_COMPLETED) {
        return (
            <Box>
                <Box
                    sx={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '4px',
                        color: 'white',
                        border: '2px solid',
                        borderColor: 'background.600',
                        borderRadius: '50%',
                        backgroundColor: 'background.900',
                    }}
                >
                    <Icon
                        as={FontAwesomeIcon}
                        icon={IconName.CIRCLE}
                        boxSize={3}
                    />
                </Box>
            </Box>
        );
    }
    return (
        <Box>
            <Box color="background.600" display="inline-flex">
                <Icon as={FontAwesomeIcon} icon={IconName.CIRCLE} boxSize={3} />
            </Box>
        </Box>
    );
};

export { StepIcon };
