import { type ChakraProps as ChakraProperties } from '@chakra-ui/react';

import logoTxt from '~/assets/img/logo-text.svg';
import { Image } from '~/bundles/common/components/components.js';

type Properties = {
    boxSize?: string;
} & ChakraProperties;

const LogoText: React.FC<Properties> = (properties) => {
    return <Image src={logoTxt} alt="Logo Text" {...properties} />;
};

export { LogoText };
