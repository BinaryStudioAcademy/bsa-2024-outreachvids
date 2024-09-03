import {
    ArrowBackIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faPen,
    faPlay,
    faScroll,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import {
    Circle,
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
    FILE_LINES: faFileLines,
    PLAY: faPlay,
    SCROLL: faScroll,
    OPTIONS_VERTICAL: faEllipsisVertical,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
    CHECK_CIRCLE: CheckCircleIcon,
    CIRCLE: Circle,
    ARROW_BACK: ArrowBackIcon,
} as const;

export { IconName };
