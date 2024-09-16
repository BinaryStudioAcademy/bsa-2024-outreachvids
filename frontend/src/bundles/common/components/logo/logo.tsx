import { type ChakraProps as ChakraProperties, Box } from '@chakra-ui/react';

import { Icon } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

type Properties = {
    textSize?: string;
    logoSize: string;
} & ChakraProperties;

const Logo: React.FC<Properties> = ({ logoSize, textSize, ...rest }) => {
    return (
        <Box display="flex" alignItems="center">
            <Icon as={IconName.LOGO} boxSize={logoSize} {...rest} />
            {textSize && (
                <Icon as={IconName.LOGO_TEXT} boxSize={textSize} ml={2} />
            )}
        </Box>
    );
};

export { Logo };
