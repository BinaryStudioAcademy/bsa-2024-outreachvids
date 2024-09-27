import {
    Box,
    Stepper,
    UploadVideo,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useMemo,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { Consent, Instruction } from '../components/components.js';
import { Steps } from '../enums/steps.js';
import styles from './styles.module.css';

const CreateAvatar: React.FC = () => {
    const navigate = useNavigate();
    const steps = useMemo(
        () => [Steps.INSTRUCTIONS, Steps.UPLOAD, Steps.CONSENT],
        [],
    );
    const [step, setStep] = useState<(typeof Steps)[keyof typeof Steps]>(
        Steps.INSTRUCTIONS,
    );

    const renderStepContent = (step: string): JSX.Element | null => {
        switch (step) {
            case Steps.INSTRUCTIONS: {
                return <Instruction onClickNext={nextStep} />;
            }
            case Steps.UPLOAD: {
                return <UploadVideo onClickNext={nextStep} />;
            }
            case Steps.CONSENT: {
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
        } else {
            navigate(AppRoute.ROOT);
        }
    }, [step, steps, navigate]);

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
