import {
    Box,
    Stepper,
    UploadVideo,
} from '~/bundles/common/components/components.js';
import {
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { Consent, Instruction } from '../components/components.js';
import styles from './styles.module.css';

const CreateAvatar: React.FC = () => {
    const steps = useMemo(() => ['Instructions', 'Upload', 'Consent'], []);
    const [step, setStep] = useState<string>('Instructions');

    const renderStepContent = (step: string): JSX.Element | null => {
        switch (step) {
            case 'Instructions': {
                return <Instruction onClickNext={nextStep} />;
            }
            case 'Upload': {
                return <UploadVideo onClickNext={nextStep} />;
            }
            case 'Consent': {
                return <Consent />;
            }
            default: {
                return null;
            }
        }
    };

    const nextStep = useCallback((): void => {
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];
            if (nextStep) {
                setStep(nextStep);
            }
        }
    }, [step, steps]);

    const previousStep = useCallback((): void => {
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            const previousStep = steps[currentIndex - 1];
            if (previousStep) {
                setStep(previousStep);
            }
        }
    }, [step, steps]);

    return (
        <Box className={styles['container']}>
            <Stepper
                steps={steps}
                currentStep={step}
                onClickBack={previousStep}
            />
            <Box className={styles['inner-container']}>
                {renderStepContent(step)}
            </Box>
        </Box>
    );
};

export { CreateAvatar };
