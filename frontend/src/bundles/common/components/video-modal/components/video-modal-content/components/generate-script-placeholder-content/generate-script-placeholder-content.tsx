import { type ComponentWithAs, type IconProps } from '@chakra-ui/react';

import { Flex, Icon, Text } from '~/bundles/common/components/components.js';

type Properties = {
    message: string;
    icon?: ComponentWithAs<'svg', IconProps>;
};

const GenerateScriptPlaceholderContent: React.FC<Properties> = ({
    message,
    icon,
}) => (
    <Flex
        gap="10px"
        direction="column"
        justify="center"
        alignItems="center"
        width="100%"
        height="100%"
    >
        {icon && (
            <Icon
                as={icon}
                color="brand.secondary.300"
                opacity="0.5"
                w={6}
                h={6}
            />
        )}
        <Text
            color="gray.400"
            variant="H3"
            w="40%"
            minWidth="175px"
            textAlign="center"
            fontStyle="italic"
        >
            {message}
        </Text>
    </Flex>
);

export { GenerateScriptPlaceholderContent };
