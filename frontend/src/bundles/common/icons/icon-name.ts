import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const IconName = {
    HOME: faHouse,
    LOG_OUT: faRightFromBracket,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
} as const;

export { IconName };
