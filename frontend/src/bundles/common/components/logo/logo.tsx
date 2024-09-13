import { type ChakraProps as ChakraProperties, Box } from '@chakra-ui/react';

import logo from '~/assets/img/logo.svg';
import logoTxt from '~/assets/img/logo-text.svg';
import { Image } from '~/bundles/common/components/components.js';

type Properties = {
    textSize?: string;
    logoSize: string;
} & ChakraProperties;

const Logo: React.FC<Properties> = ({ logoSize, textSize, ...rest }) => {
    return (
        <Box display="flex" alignItems="center">
            <Image src={logo} alt="Logo" {...rest} ml={2} boxSize={logoSize} />
            {textSize && (
                <Image
                    src={logoTxt}
                    alt="Logo Text"
                    boxSize={textSize}
                    ml={2}
                />
            )}
        </Box>
    );
};

export { Logo };
