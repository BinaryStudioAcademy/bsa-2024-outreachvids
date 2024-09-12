import { type ComponentWithAs, type IconProps } from '@chakra-ui/react';

import { Flex, Icon, Text } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    message: string;
    icon?: ComponentWithAs<'svg', IconProps>;
};

const GenerateScriptPlaceholderContent: React.FC<Properties> = ({
    message,
    icon,
}) => (
    <Flex className={styles['scriptPlaceholderContentContainer']}>
        {icon && (
            <Icon
                as={icon}
                className={styles['scriptPlaceholderContentIcon']}
            />
        )}
        <Text className={styles['scriptPlaceholderContentText']} variant="H3">
            {message}
        </Text>
    </Flex>
);

export { GenerateScriptPlaceholderContent };
