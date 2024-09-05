import { Box, Circle, Flex, Text } from '@chakra-ui/react';

import { SPIN_ANIMATION } from './libs/constants/constants.js';
import styles from './loader.module.css';

const Loader = (): JSX.Element => {
    return (
        <Flex flexDirection="column" alignItems="center">
            <Box position="relative" width="100px" height="100px">
                <Circle className={styles['loaderCircle']}>
                    LOGO
                </Circle>
                <Circle
                    className={styles['loaderCircleAnimation']}
                    animation={`${SPIN_ANIMATION} 1s linear infinite`}
                />
            </Box>
            <Text fontSize="lg" marginTop="10px">
                Loading...
            </Text>
        </Flex>
    );
};

export { Loader };
