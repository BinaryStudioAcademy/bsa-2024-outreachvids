import { extendTheme } from '@chakra-ui/react';

import { colors, components, global } from './styles/styles.js';

const theme = extendTheme({ styles: { global }, colors, components });

export { theme };
