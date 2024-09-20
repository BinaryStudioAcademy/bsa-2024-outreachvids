import { type ChakraProps as ChakraProperties, Box } from '@chakra-ui/react';

import { Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

type Properties = {
    textSize?: string;
    logoSize: string;
    isDark?: boolean;
} & ChakraProperties;

const Logo: React.FC<Properties> = ({
    logoSize,
    textSize,
    isDark = false,
    ...rest
}) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            color={isDark ? 'background.600' : 'white'}
        >
            <Icon as={IconName.LOGO} boxSize={logoSize} {...rest} />
            {textSize && (
                <Icon
                    as={IconName.LOGO_TEXT}
                    boxSize={textSize}
                    ml={2}
                    h="auto"
                />
            )}
        </Box>
    );
};

export { Logo };
