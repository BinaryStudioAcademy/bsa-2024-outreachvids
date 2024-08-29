import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
    faEllipsisVertical,
    faHouse,
    faPen,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    HOME: faHouse,
    LOG_OUT: faRightFromBracket,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    OPTIONS_VERTICAL: faEllipsisVertical,
    PEN: faPen,
} as const;

export { IconName };
