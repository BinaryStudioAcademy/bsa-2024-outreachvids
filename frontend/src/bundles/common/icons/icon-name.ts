import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { faEllipsisVertical, faPen } from '@fortawesome/free-solid-svg-icons';

import {
    HouseIcon,
    RightFromBracketIcon,
} from './helper/icon-conversion.helper.js';

const IconName = {
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    OPTIONS_VERTICAL: faEllipsisVertical,
    PEN: faPen,
} as const;

export { IconName };
