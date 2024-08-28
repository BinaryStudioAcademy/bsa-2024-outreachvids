import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Box, Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { type Step as StepType } from '../../types/step.type.js';

type Properties = {
    step: StepType;
};

const StepIcon: React.FC<Properties> = ({ step }) => {
    if (step === 'completed') {
        return (
            <Box>
                <Box backgroundColor="background.900" display="inline-flex">
                    <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
                </Box>
            </Box>
        );
    }

    if (step === 'current' || step === 'lastCompleted') {
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
