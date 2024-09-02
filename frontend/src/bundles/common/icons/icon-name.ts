import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faBackwardStep,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faForwardStep,
    faPause,
    faPen,
    faPlay,
    faScroll,
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
    FILE_LINES: faFileLines,
    PLAY: faPlay,
    PLAY_STEP_BACK: faBackwardStep,
    PLAY_STEP_NEXT: faForwardStep,
    PAUSE: faPause,
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
} as const;

export { IconName };
