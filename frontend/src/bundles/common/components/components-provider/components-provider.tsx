import { ChakraProvider } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { theme } from '~/framework/theme/theme.js';

const emotionCache = createCache({
    key: 'emotion-css-cache',
    prepend: true,
});
const ComponentsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    );
};

export { ComponentsProvider };
