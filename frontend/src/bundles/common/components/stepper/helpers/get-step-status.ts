import { type Step as StepType } from '../types/step.type.js';

type Properties = {
    stepName: string;
    index: number;
    currentStep: string;
    steps: string[];
};

const getStepStatus = ({
    stepName,
    index,
    currentStep,
    steps,
}: Properties): StepType => {
    if (index < steps.indexOf(currentStep)) {
        return 'completed';
    }
    if (currentStep === steps.at(-1)) {
        return 'lastCompleted';
    }
    if (index === steps.length - 1) {
        return 'lastUncompleted';
    }
    if (currentStep === stepName) {
        return 'current';
    }
    return 'default';
};

export { getStepStatus };
