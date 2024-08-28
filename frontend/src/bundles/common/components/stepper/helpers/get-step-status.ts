import { type ValueOf } from 'shared';

import { Step } from '../enums/enums.js';

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
}: Properties): ValueOf<typeof Step> => {
    if (index < steps.indexOf(currentStep)) {
        return Step.COMPLETED;
    }
    if (currentStep === steps.at(-1)) {
        return Step.LAST_COMPLETED;
    }
    if (index === steps.length - 1) {
        return Step.LAST_UNCOMPLETED;
    }
    if (currentStep === stepName) {
        return Step.CURRENT;
    }
    return Step.DEFAULT;
};

export { getStepStatus };
