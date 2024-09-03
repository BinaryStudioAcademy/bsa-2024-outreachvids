import { Box, Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

type Properties = {
    step: 'complete' | 'active' | 'incomplete';
};

const StepIcon: React.FC<Properties> = ({ step }) => {
    if (step === 'complete') {
        return (
            <Box backgroundColor="background.900" display="inline-flex">
                <Icon as={IconName.CHECK_CIRCLE} boxSize={3} />
            </Box>
        );
    }

    if (step === 'active') {
        return (
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
                <Icon as={IconName.CIRCLE} boxSize={3} />
            </Box>
        );
    }
    return (
        <Box color="background.600" display="inline-flex">
            <Icon as={IconName.CIRCLE} boxSize={3} />
        </Box>
    );
};

export { StepIcon };
