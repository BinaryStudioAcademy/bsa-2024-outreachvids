import { Flex, Text } from '~/bundles/common/components/components.js';

import { type Step as StepType } from '../../types/step.type.js';
import { StepIcon } from '../step-icon/step-icon.js';

type Properties = {
    step: StepType;
    stepDescription: string;
};

const Step: React.FC<Properties> = ({ step, stepDescription }) => {
    const afterStyles = {
        zIndex: -1,
        content: '""',
        position: 'relative',
        top: '24px',
        left: '50%',
        height: '2px',
        backgroundColor: step === 'completed' ? 'white' : 'background.600',
        order: -1,
    };

    return (
        <Flex
            sx={{
                flex: 1,
                flexDirection: 'column',
                textAlign: 'center',
            }}
            _before={{
                content: '""',
                position: 'relative',
                zIndex: 1,
                display: 'block',
                borderRadius: '50%',
                margin: '11px auto 0',
            }}
            _after={
                step === 'lastUncompleted' || step === 'lastCompleted'
                    ? {}
                    : afterStyles
            }
        >
            <StepIcon step={step} />
            <Text
                as="p"
                sx={{
                    marginTop: '5px',
                    textAlign: 'center',
                    color:
                        step === 'default' || step === 'lastUncompleted'
                            ? 'background.600'
                            : 'white',
                }}
            >
                {stepDescription}
            </Text>
        </Flex>
    );
};

export { Step };
