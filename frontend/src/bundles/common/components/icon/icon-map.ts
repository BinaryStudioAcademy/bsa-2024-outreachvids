import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import { HomeIcon, LogOutIcon } from './components/icons.js';

const IconMap = {
    HOME: HomeIcon,
    LOG_OUT: LogOutIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
} as const;

export { IconMap };
