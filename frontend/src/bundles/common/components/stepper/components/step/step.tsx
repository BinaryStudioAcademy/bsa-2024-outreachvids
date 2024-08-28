import { type ValueOf } from 'shared';

import { Flex, Text } from '~/bundles/common/components/components.js';

import { Step as StepEnum } from '../../enums/enums.js';
import { StepIcon } from '../step-icon/step-icon.js';

type Properties = {
    step: ValueOf<typeof StepEnum>;
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
        backgroundColor:
            step === StepEnum.COMPLETED ? 'white' : 'background.600',
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
                step === StepEnum.LAST_UNCOMPLETED ||
                step === StepEnum.LAST_COMPLETED
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
                        step === StepEnum.DEFAULT ||
                        step === StepEnum.LAST_UNCOMPLETED
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
