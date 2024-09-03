const getActiveStepIndex = ({
    currentStep,
    steps,
}: {
    currentStep: string;
    steps: string[];
}): number => steps.indexOf(currentStep);

export { getActiveStepIndex };
