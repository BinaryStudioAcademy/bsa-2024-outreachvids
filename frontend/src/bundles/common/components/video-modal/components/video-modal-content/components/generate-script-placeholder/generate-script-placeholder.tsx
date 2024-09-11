import { Icon, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName } from '~/bundles/common/icons/icons.js';

import styles from '../../../../video-modal.module.css';

const GenerateScriptPlaceholder: React.FC = () => {
    return (
        <VStack className={styles['scriptPlaceholderContainer']}>
            <Icon
                as={FontAwesomeIcon}
                icon={IconName.SCROLL}
                className={styles['scriptPlaceholderIcon']}
            />
            <Text className={styles['scriptPlaceholderText']} variant="H3">
                Here you will see your generated script
            </Text>
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
