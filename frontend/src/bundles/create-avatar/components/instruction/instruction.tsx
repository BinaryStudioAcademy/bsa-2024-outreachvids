import { Button, Flex } from '~/bundles/common/components/components.js';

import { InstructionList } from '../instruction-list/instruction-list.js';
import styles from './styles.module.css';

const screenshotListItems = [
    'At least 5 minutes of footage',
    'High resolution camera',
    'Well-lit quiet environment',
    'Keep your head centered in the frame',
    'Ensure face visibility; do not cover your mouth',
    'Use a tripod or stabilize your phone to avoid shaking',
];

const avoidListItems = [
    'Stitches or cuts of your footage',
    'Talking without pauses',
    'Fast head movements',
    'Loud background noise like music',
    'Shadows or overexposure on your face',
    'Diverting your gaze or looking around',
    'Hand gestures above the chest or pointing gestures',
];

type Properties = {
    onClickNext: () => void;
};

const Instruction: React.FC<Properties> = ({ onClickNext }) => {
    return (
        <Flex className={styles['flex-container']}>
            <Flex className={styles['inner-flex']}>
                <InstructionList
                    color="brand.secondary.50"
                    listItems={screenshotListItems}
                    title={'Screenshots'}
                />
                <InstructionList
                    color="brand.secondary.900"
                    listItems={avoidListItems}
                    title={'Things to avoid'}
                />
            </Flex>
            <Button label="Next step" width="220px" onClick={onClickNext} />
        </Flex>
    );
};

export { Instruction };
