import { motion } from 'framer-motion';

import {
    CIRCLE_TRANSITION,
    CIRCLE_VARIANTS,
} from '../not-found-animation/constants/constants.js';

const NotFoundAnimation: React.FC = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 82.7"
        width="500"
        height="400"
        aria-hidden="true"
    >
        <g>
            <text
                transform="matrix(1.2187 0 0 1 13 75.6393)"
                fill="white"
                fontSize="83"
                fontFamily="FootlightMTLight"
                aria-hidden="true"
            >
                4
            </text>
            <text
                transform="matrix(1.2187 0 0 1 133 73.6393)"
                fill="white"
                fontSize="83"
                fontFamily="FootlightMTLight"
                aria-hidden="true"
            >
                4
            </text>
        </g>
        <g>
            <motion.path
                d="M81.8,29.2c4.1-5.7,10.7-9.4,18.3-9.4c6.3,0,12.1,2.7,16.1,6.9c0.6-0.4,1.1-0.7,1.7-1.1
                    c-4.4-4.8-10.8-7.9-17.8-7.9c-8.3,0-15.6,4.2-20,10.6C80.7,28.5,81.3,28.8,81.8,29.2z"
                fill="white"
                aria-hidden="true"
            />
            <motion.path
                d="M118.1,53.7c-4,5.7-10.7,9.5-18.2,9.5c-6.3,0-12.1-2.6-16.2-6.8c-0.6,0.4-1.1,0.7-1.7,1.1
                    c4.4,4.8,10.8,7.8,17.9,7.8c8.3,0,15.6-4.3,19.9-10.7C119.2,54.5,118.6,54.1,118.1,53.7z"
                fill="white"
                aria-hidden="true"
            />
            <motion.circle
                cx="100"
                cy="41"
                r="1"
                fill="white"
                variants={CIRCLE_VARIANTS}
                animate="animate"
                transition={CIRCLE_TRANSITION}
            />
        </g>
    </motion.svg>
);

export { NotFoundAnimation };
