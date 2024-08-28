import { IconName } from '../../icons/icons.js';
import { Box, Flex, Header, Icon, IconButton } from '../components.js';
import { Step } from './components/components.js';
import { getStepStatus } from './helpers/helpers.js';

type Properties = {
    steps: string[];
    currentStep: string;
};

const stepsElements: React.FC<Properties> = ({ steps, currentStep }) => {
    return steps.map((stepName, index) => {
        return (
            <Step
                key={index}
                stepDescription={stepName}
                step={getStepStatus({ stepName, index, currentStep, steps })}
            />
        );
    });
};

const Stepper: React.FC<Properties> = ({ steps, currentStep }) => {
    const backButton = (
        <IconButton
            variant="ghostIcon"
            aria-label="back"
            icon={<Icon as={IconName.ARROW_BACK} boxSize={4} />}
        />
    );

    const stepProgressBar = (
        <Box
            sx={{
                position: 'relative',
                width: '340px',
                height: '100%',
            }}
        >
            <Flex
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: '100%',
                    color: 'white',
                }}
            >
                {stepsElements({ steps, currentStep })}
            </Flex>
        </Box>
    );

    return <Header left={backButton} center={stepProgressBar} />;
};

export { Stepper };
