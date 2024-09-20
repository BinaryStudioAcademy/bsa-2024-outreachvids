import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

const Consent: React.FC = () => {
    return (
        <Flex className={styles['flex-container']}>
            <Text variant={'title'} color={'background.600'} marginTop={'2vh'}>
                Concent
            </Text>
            <Text variant={'body1'} color="typography.600" mb={3}>
                To prevent misuse of technology, we just need to confirm the
                person in the video is you.
            </Text>
            <Box
                className={styles['recordSection']}
                borderColor={'background.50'}
            >
                <Icon
                    as={IconName.VIDEO_CAMERA}
                    boxSize={100}
                    color={'background.600'}
                />
                <Button label="Record a consent" width="220px" />
            </Box>
            <Button label="Generate Avatar" width="220px" />
        </Flex>
    );
};

export { Consent };
