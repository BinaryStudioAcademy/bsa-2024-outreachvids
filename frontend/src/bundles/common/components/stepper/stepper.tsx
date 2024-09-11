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
import styles from './styles.module.css';

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
        <Box className={styles['stepperWrapper']}>
            <Box className={styles['innerStepper']}>
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
                                    variant="body1"
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
                    className={styles['progressBar']}
                />
            </Box>
        </Box>
    );
    return <Header left={backButton} center={stepProgressBar} />;
};

export { Stepper };
