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
    <Flex className={styles['script-placeholder-content-container']}>
        {icon && (
            <Icon
                as={icon}
                className={styles['script-placeholder-content-icon']}
            />
        )}
        <Text
            className={styles['script-placeholder-content-text']}
            variant="H3"
        >
            {message}
        </Text>
    </Flex>
);

export { GenerateScriptPlaceholderContent };
