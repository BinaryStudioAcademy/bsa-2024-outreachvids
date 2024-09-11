import { Icon, Text, VStack } from '@chakra-ui/react';

import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

const GenerateScriptPlaceholder: React.FC = () => {
    return (
        <VStack className={styles['scriptPlaceholderContainer']}>
            <Icon
                as={IconName.SCROLL}
                className={styles['scriptPlaceholderIcon']}
                boxSize={10}
            />
            <Text className={styles['scriptPlaceholderText']} variant="H3">
                Here you will see your generated script
            </Text>
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
