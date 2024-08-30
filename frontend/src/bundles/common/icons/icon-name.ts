import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faCloudArrowUp,
    faEllipsisVertical,
    faFont,
    faPen,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import {
    CircleUserIcon,
    HouseIcon,
    RightFromBracketIcon,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: faPen,
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    OPTIONS_VERTICAL: faEllipsisVertical,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
} as const;

export { IconName };
