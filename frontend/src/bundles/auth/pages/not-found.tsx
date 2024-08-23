import { motion } from 'framer-motion';

import { Box, Center, Text } from '~/bundles/common/components/components.js';

const NotFound: React.FC = () => {
    const circleAnimation = {
        r: [1, 5, 10, 15, 20],
        opacity: [0.9, 0.3, 0.2, 0.1, 0],
    };

    const circleTransition = {
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeOut',
        duration: 2,
    };

    return (
        <Center height="100vh" background="background.900">
            <Box textAlign="center">
                <motion.svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 82.7"
                    width="500px"
                    height="400px"
                    aria-label="404 Page not found"
                >
                    <g>
                        <text
                            transform="matrix(1.2187 0 0 1 13 75.6393)"
                            fill="white"
                            fontSize="83.0285px"
                            fontFamily="FootlightMTLight"
                        >
                            4
                        </text>
                        <text
                            transform="matrix(1.2187 0 0 1 133.0003 73.6393)"
                            fill="white"
                            fontSize="83.0285px"
                            fontFamily="FootlightMTLight"
                        >
                            4
                        </text>
                    </g>
                    <g>
                        <motion.path
                            d="M81.8,29.2c4.1-5.7,10.7-9.4,18.3-9.4c6.3,0,12.1,2.7,16.1,6.9c0.6-0.4,1.1-0.7,1.7-1.1
                c-4.4-4.8-10.8-7.9-17.8-7.9c-8.3,0-15.6,4.2-20,10.6C80.7,28.5,81.3,28.8,81.8,29.2z"
                            fill="white"
                        />
                        <motion.path
                            d="M118.1,53.7c-4,5.7-10.7,9.5-18.2,9.5c-6.3,0-12.1-2.6-16.2-6.8c-0.6,0.4-1.1,0.7-1.7,1.1
                c4.4,4.8,10.8,7.8,17.9,7.8c8.3,0,15.6-4.3,19.9-10.7C119.2,54.5,118.6,54.1,118.1,53.7z"
                            fill="white"
                        />
                        <motion.circle
                            cx="100"
                            cy="41"
                            r="1"
                            fill="white"
                            animate={circleAnimation}
                            transition={circleTransition}
                        />
                    </g>
                </motion.svg>
                <Text
                    fontSize="2xl"
                    color="white"
                    mt={4}
                    as="span"
                >
                    [Page not found]
                </Text>
            </Box>
        </Center>
    );
};

export { NotFound };
