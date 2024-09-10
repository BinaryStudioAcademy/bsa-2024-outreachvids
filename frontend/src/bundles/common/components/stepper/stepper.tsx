import {
    Box,
    Header,
    Icon,
    IconButton,
    LibraryStepper,
    Progress,
    Step,
    StepIndicator,
    StepStatus,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { StepIcon } from './components/components.js';
import { StepIcon as StepIconEnum } from './enums/enums.js';

type Properties = {
    steps: string[];
    currentStep: string;
};

const Stepper: React.FC<Properties> = ({ steps, currentStep }) => {
    const activeStepIndex = steps.indexOf(currentStep);
    const progressPercent = (activeStepIndex / (steps.length - 1)) * 100;

    const backButton = (
        <IconButton
            variant="ghostIcon"
            aria-label="back"
            icon={<Icon as={IconName.ARROW_BACK} boxSize={4} />}
        />
    );

    const stepProgressBar = (
        <Box
            position="relative"
            maxWidth="340px"
            minWidth="300px"
            height="100%"
        >
            <Box position="absolute" bottom="20px" width="100%" height="100%">
                <LibraryStepper size="sm" index={activeStepIndex} gap="0">
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator
                                bg="white"
                                height="12px"
                                width="12px"
                            >
                                <StepStatus
                                    complete={
                                        <StepIcon
                                            step={StepIconEnum.COMPLETE}
                                        />
                                    }
                                    active={
                                        <StepIcon step={StepIconEnum.ACTIVE} />
                                    }
                                    incomplete={
                                        <StepIcon
                                            step={StepIconEnum.INCOMPLETE}
                                        />
                                    }
                                />
                                <Text
                                    as="p"
                                    color={
                                        index <= activeStepIndex
                                            ? 'white'
                                            : 'background.600'
                                    }
                                    position="absolute"
                                    top="20px"
                                >
                                    {step}
                                </Text>
                            </StepIndicator>
                        </Step>
                    ))}
                </LibraryStepper>
                <Progress
                    variant="stepper"
                    value={progressPercent}
                    position="absolute"
                    height="3px"
                    width="full"
                    top="5px"
                    zIndex={-1}
                />
            </Box>
        </Box>
    );
    return <Header left={backButton} center={stepProgressBar} />;
};

export { Stepper };
