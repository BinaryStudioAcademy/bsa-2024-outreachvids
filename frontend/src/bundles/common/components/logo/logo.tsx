import { type ChakraProps as ChakraProperties } from '@chakra-ui/react';

import logo from '~/assets/img/logo.svg';
import { Image } from '~/bundles/common/components/components.js';

type Properties = {
    boxSize?: string;
} & ChakraProperties;

const Logo: React.FC<Properties> = (properties) => {
    return <Image src={logo} alt="Logo" {...properties} />;
};

export { Logo };
